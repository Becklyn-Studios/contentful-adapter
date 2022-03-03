import { ContentfulPage } from "../contentful/types";
import { UiComponentDataConfig } from "../config/types";
import { Entry } from "contentful";
import {
    ComponentDataConfig,
    DataType,
    TYPE_ASSET,
    TYPE_BOOL,
    TYPE_LABELED_LINK,
    TYPE_NUMBER,
    TYPE_RTE,
    TYPE_STRING,
} from "@mayd/ui-types";
import { getComponentKeyFromData, getDataFieldNames, getIdFromData } from "./util";
import { ContentfulNormalizerService } from "./service";
import { normalizeAssetData } from "./asset";
import { getRteData } from "./rte";
import { normalizeLabeledLink } from "./reference";
import { normalizeRelationTypeData } from "./relation";
import { findOneEntryBySys } from "../contentful/api";

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
    component: UiComponentDataConfig,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    const dataConfig = component.component.data;

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

    outputData["id"] = getIdFromData(data);
    outputData["componentKey"] = getComponentKeyFromData(data, service);

    for (let i = 0; i < fieldNames.length; i++) {
        const fieldName = fieldNames[i];
        const dataType = dataConfig[fieldName];

        if (dataType) {
            outputData[fieldName] = await getDataValue(
                data.fields[fieldName] ?? null,
                dataType,
                service
            );
        }
    }

    return outputData;
};

const addThemeToData = (
    outputData: any,
    data: Entry<any>,
    service: ContentfulNormalizerService
): void => {
    if (!data || !data.fields || !data.fields.theme) {
        return;
    }

    outputData["theme"] = service.getThemeValue(data.fields.theme);
};

const addVersionToData = (
    outputData: any,
    data: Entry<any>,
    service: ContentfulNormalizerService
): void => {
    if (!data || !data.fields || !data.fields.version) {
        return;
    }

    outputData["version"] = service.getVersionValue(data.fields.version);
};

const addAnchorDataToData = (
    outputData: any,
    data: Entry<any>,
    service: ContentfulNormalizerService
): void => {
    if (data && data.fields && data.fields.anchor) {
        outputData["anchor"] = data.fields.anchor;
    }

    if (data && data.fields && data.fields.anchorLabel) {
        outputData["anchorLabel"] = data.fields.anchorLabel;
    }
};

const getDataValue = async (
    data: any,
    dataType: DataType,
    service: ContentfulNormalizerService
): Promise<any | null> => {
    switch (dataType) {
        case TYPE_STRING:
            return "string" === typeof data ? data : null;
        case TYPE_BOOL:
            return "boolean" === typeof data ? data : null;
        case TYPE_NUMBER:
            return "number" === typeof data ? data : null;
        case TYPE_RTE:
            return await getRteData(data, service);
        case TYPE_ASSET:
            return await normalizeAssetData(data, service);
        case TYPE_LABELED_LINK:
            return await normalizeLabeledLink(data, service);
        default:
            if ("string" !== typeof dataType) {
                return await normalizeRelationTypeData(dataType, data, service);
            }

            const normalizer = service.getCustomNormalizer(dataType);

            return normalizer ? await normalizer(data, service) : null;
    }
};
