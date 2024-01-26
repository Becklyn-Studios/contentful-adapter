import { ContentfulPage } from "../contentful/types";
import { Entry } from "contentful";
import {
    ComponentDataConfig,
    DataType,
    TYPE_ASSET,
    TYPE_BOOL,
    TYPE_HEADLINE,
    TYPE_LABELED_LINK,
    TYPE_NUMBER,
    TYPE_RAW,
    TYPE_RTE,
    TYPE_STRING,
} from "@becklyn/ui-types";
import { getComponentKeyFromData, getDataFieldNames, getIdFromData, getValueOfField } from "./util";
import { ContentfulNormalizerService } from "./service";
import { normalizeAssetData } from "./asset";
import { getRteData } from "./rte";
import { normalizeLabeledLink } from "./reference";
import { normalizeRelationTypeData } from "./relation";
import { findOneEntryBySys } from "../contentful/api";
import { getHeadlineString } from "./headline";
import { ContentfulComponentConfig } from "../config/types";

export const normalizePageData = async (
    pageData: Entry<ContentfulPage>,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    return await normalizeData(pageData, service);
};

export const normalizeData = async (
    data: Entry<any>,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    if ("Asset" === data.sys.type) {
        return normalizeAssetData(data, service);
    }

    if ("Link" === data.sys.type) {
        // load missing data
        const newData = await findOneEntryBySys(data.sys, service.client, { depth: 10 });

        if (null === newData) {
            return null;
        }

        return normalizeData(newData, service);
    }

    const contentType = data.sys.contentType.sys.id;

    for (let i = 0; i < service.allUiComponents.length; i++) {
        const component = service.allUiComponents[i];

        if (component.contentType === contentType) {
            return await normalizeDataForComponent(data, component, service);
        }
    }

    return null;
};

export const normalizeDataForComponent = async (
    data: Entry<any>,
    component: ContentfulComponentConfig,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    const dataConfig = component.data;

    if (!dataConfig) {
        return null;
    }

    return await normalizeDataForDataConfig(data, dataConfig, service);
};

export const normalizeDataForDataConfig = async (
    data: Entry<any>,
    dataConfig: ComponentDataConfig,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    if (!data.fields) {
        // load missing data
        const newData = await findOneEntryBySys(data.sys, service.client, { depth: 10 });

        if (null === newData) {
            return null;
        }

        data = newData;
    }

    const fieldNames = getDataFieldNames(data, dataConfig);
    const outputData: any = {};

    addThemeToData(outputData, data, service);
    addVersionToData(outputData, data, service);
    addAnchorDataToData(outputData, data, service);

    if (data.fields.nt_experiences) {
        await addNinetailed(outputData, data, service);
    }

    outputData["id"] = getIdFromData(data);
    outputData["componentKey"] = getComponentKeyFromData(data, service);

    for (let i = 0; i < fieldNames.length; i++) {
        const fieldName = fieldNames[i];
        const dataType = dataConfig[fieldName];

        if (dataType) {
            const normalizer =
                "string" === typeof dataType ? service.getCustomNormalizer(dataType) : null;

            const fieldData = getValueOfField(data.fields[fieldName], service.locale);

            outputData[fieldName] = normalizer
                ? await normalizer(fieldData ?? null, service, data)
                : await getDataValue(fieldData ?? null, dataType, service);
        }
    }

    return outputData;
};

const normalizeVariant = async (variant: any, service: any): Promise<Entry<any>> => {
    const { labeledLink } = variant.fields;
    const reference = labeledLink.fields.reference.fields.reference;

    if (reference) {
        labeledLink.fields = {
            label: labeledLink.fields.label,
            reference: {
                metadata: labeledLink.fields.reference.metadata,
                sys: labeledLink.fields.reference.sys,
                fields: {
                    title: labeledLink.fields.reference.fields.title,
                    reference: { sys: reference.sys },
                    inNewTab: labeledLink.fields.reference.fields.inNewTab,
                },
            },
        };
    }

    return await normalizeData(variant, service);
};

const processVariants = async (variants: any[], service: any): Promise<Entry<any>[]> => {
    return await Promise.all(variants.map(variant => normalizeVariant(variant, service)));
};

const addNinetailed = async (
    outputData: any,
    data: Entry<any>,
    service: ContentfulNormalizerService
): Promise<void> => {
    if (!data || !data.fields) {
        return;
    }

    const ntFieldData = getValueOfField(data.fields.nt_experiences, service.locale);

    if (!ntFieldData) {
        return;
    }

    let variants: Entry<any>[] = [];
    const rawVariants: Record<string, Entry<any>> = {};

    ntFieldData.forEach((data: Entry<any>) => {
        if (!data.fields.nt_variants) {
            return;
        }

        variants = data.fields.nt_variants;

        data.fields.nt_variants.forEach((variant: Entry<any>) => {
            rawVariants[variant.sys.id] = variant;
        });
    });

    const normalizedVariants = await processVariants(variants, service);

    outputData["ninetailed"] = ntFieldData.map((data: Entry<any>) => ({
        ...data,
        fields: {
            ...data.fields,
            nt_variants: normalizedVariants.map(function (variant: any) {
                return {
                    ...rawVariants[variant.id],
                    ...variant,
                };
            }),
        },
    }));
};

const addThemeToData = (
    outputData: any,
    data: Entry<any>,
    service: ContentfulNormalizerService
): void => {
    if (!data || !data.fields || !data.fields.theme) {
        return;
    }

    const themeFieldData = getValueOfField(data.fields.theme, service.locale);

    if (!themeFieldData) {
        return;
    }

    outputData["theme"] = service.getThemeValue(themeFieldData);
};

const addVersionToData = (
    outputData: any,
    data: Entry<any>,
    service: ContentfulNormalizerService
): void => {
    if (!data || !data.fields || !data.fields.version) {
        return;
    }

    const versionFieldData = getValueOfField(data.fields.version, service.locale);

    if (!versionFieldData) {
        return;
    }

    outputData["version"] = service.getVersionValue(versionFieldData);
};

const addAnchorDataToData = (
    outputData: any,
    data: Entry<any>,
    service: ContentfulNormalizerService
): void => {
    if (data && data.fields && data.fields.anchor) {
        outputData["anchor"] = getValueOfField(data.fields.anchor, service.locale);
    }

    if (data && data.fields && data.fields.anchorLabel) {
        outputData["anchorLabel"] = getValueOfField(data.fields.anchorLabel, service.locale);
    }
};

const getDataValue = async (
    data: any,
    dataType: DataType,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    switch (dataType) {
        case TYPE_RAW:
            return data;
        case TYPE_STRING:
            return "string" === typeof data ? data : null;
        case TYPE_BOOL:
            return "boolean" === typeof data ? data : null;
        case TYPE_NUMBER:
            return "number" === typeof data ? data : null;
        case TYPE_RTE:
            return await getRteData(data, service);
        case TYPE_HEADLINE:
            return getHeadlineString(data);
        case TYPE_ASSET:
            return await normalizeAssetData(data, service);
        case TYPE_LABELED_LINK:
            return await normalizeLabeledLink(data, service);
        default:
            return await normalizeRelationTypeData(dataType, data, service);
    }
};
