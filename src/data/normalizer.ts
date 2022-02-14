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
import { getComponentKeyFromData, getDataFieldNames } from "./util";
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

    const fieldNames = getDataFieldNames(data);
    const outputData: any = {};

    for (let i = 0; i < fieldNames.length; i++) {
        const fieldName = fieldNames[i];
        const dataType = dataConfig[fieldName];

        if (dataType) {
            outputData[fieldName] = await getDataValue(data.fields[fieldName], dataType, service);
        }
    }

    outputData["componentKey"] = getComponentKeyFromData(data, service);

    return outputData;
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
            return await normalizeRelationTypeData(dataType, data, service);
    }
};
