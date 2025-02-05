import { ContentfulNormalizerService } from "./service";
import {
    getContentTypeFromComponentKey,
    getContentTypeFromData,
    getDataConfigForContentType,
    isArray,
    isArrayRelationType,
    isBaseComponentConfig,
    isSingleRelationType,
} from "./util";
import {
    ArrayRelationType,
    Asset,
    BaseComponentConfig,
    LabeledLink,
    SingleRelationType,
    TYPE_ASSET,
    TYPE_LABELED_LINK,
    TYPE_STRING,
} from "@becklyn/ui-types";
import { normalizeAssetData } from "./asset";
import { normalizeLabeledLink } from "./reference";
import { normalizeDataForDataConfig } from "./normalizer";
import { findOneEntryBySys } from "../contentful/api";

export const normalizeRelationTypeData = async (
    dataType: any,
    data: any,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    if (isSingleRelationType(dataType)) {
        return await normalizeSingleRelationTypeData(dataType, data, service);
    }

    return isArrayRelationType(dataType)
        ? normalizeArrayRelationTypeData(dataType, data, service)
        : null;
};

const normalizeSingleRelationTypeData = async (
    dataType: SingleRelationType,
    data: any,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    const relatedType = dataType.data;

    if (!relatedType || isArray(data)) {
        return null;
    }

    if (isBaseComponentConfig(relatedType)) {
        return await normalizeDataForDataConfig(data, relatedType.data || {}, service);
    }

    return isArray(relatedType)
        ? await normalizeDynamicDataConfigData(relatedType, data, service)
        : null;
};

const normalizeArrayRelationTypeData = async (
    dataType: ArrayRelationType,
    data: any,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    const relatedType = dataType.data;

    if (!relatedType || !isArray(data)) {
        return null;
    }

    if (isBaseComponentConfig(relatedType)) {
        const normalizedData: any[] = [];

        for (let i = 0; i < data.length; i++) {
            const normalized = await normalizeDataForDataConfig(
                data[i],
                relatedType.data || {},
                service
            );

            if (normalized) {
                normalizedData.push(normalized);
            }
        }

        return normalizedData;
    }

    if (isArray(relatedType)) {
        let normalizedData: any[] = [];

        for (let i = 0; i < data.length; i++) {
            const normalized = await normalizeDynamicDataConfigData(relatedType, data[i], service);

            if (normalized) {
                normalizedData.push(normalized);
            }

            const normalizedDataCustomNormalizer = await normalizeDynamicDataCustomNormalizer(
                relatedType,
                data[i],
                service
            );

            if (normalizedDataCustomNormalizer.length > 0) {
                normalizedData = [...normalizedData, ...normalizedDataCustomNormalizer];
            }
        }

        return normalizedData;
    }

    const normalizer =
        "string" === typeof relatedType ? service.getCustomNormalizer(relatedType) : null;

    if (normalizer) {
        const normalizedData: string[] = [];

        for (let i = 0; i < data.length; i++) {
            const value = await normalizer(data[i], service);

            if (value) {
                normalizedData.push(value);
            }
        }

        return normalizedData;
    }

    if (TYPE_STRING === relatedType) {
        return data.filter(element => "string" === typeof element);
    }

    if (TYPE_ASSET === relatedType) {
        const normalizedData: Asset[] = [];

        for (let i = 0; i < data.length; i++) {
            const asset = await normalizeAssetData(data[i], service);

            if (asset) {
                normalizedData.push(asset);
            }
        }

        return normalizedData;
    }

    if (TYPE_LABELED_LINK === relatedType) {
        const normalizedData: LabeledLink[] = [];

        for (let i = 0; i < data.length; i++) {
            const labeledLink = await normalizeLabeledLink(data[i], service);

            if (labeledLink) {
                normalizedData.push(labeledLink);
            }
        }

        return normalizedData;
    }

    return null;
};

export const normalizeDynamicDataConfigData = async (
    dataTypes: (string | BaseComponentConfig)[],
    fieldData: any,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    if (!fieldData.sys) {
        return null;
    }

    const allowedContentTypes = dataTypes.map(componentKey =>
        "string" === typeof componentKey
            ? getContentTypeFromComponentKey(componentKey, service)
            : componentKey.key
    );

    if (!fieldData.fields) {
        // load missing data
        const newData = await findOneEntryBySys(fieldData.sys, service.client, { depth: 10 });

        if (null === newData) {
            return null;
        }

        fieldData = newData;
    }

    const contentType = getContentTypeFromData(fieldData);

    if (null === contentType || !allowedContentTypes.includes(contentType)) {
        return null;
    }

    const dataConfig = getDataConfigForContentType(contentType, service);

    if (null === dataConfig) {
        return null;
    }

    return await normalizeDataForDataConfig(fieldData, dataConfig, service);
};

const normalizeDynamicDataCustomNormalizer = async (
    dataTypes: (string | BaseComponentConfig)[],
    fieldData: any,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    const normalizedData: any[] = [];

    for (const dataType of dataTypes) {
        const normalizer =
            "string" === typeof dataType ? service.getCustomNormalizer(dataType) : null;

        if (normalizer) {
            const value = await normalizer(fieldData, service);

            if (value) {
                normalizedData.push(value);
            }
        }
    }

    return normalizedData;
};
