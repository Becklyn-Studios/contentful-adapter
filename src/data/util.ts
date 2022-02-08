import { Entry } from "contentful";
import {
    ArrayRelationType,
    ComponentDataConfig,
    SingleRelationType,
    TYPE_ASSET,
    TYPE_LABELED_LINK,
    TYPE_STRING,
} from "@mayd/ui-types";
import { ContentfulNormalizerService } from "./service";

export const getDataFieldNames = (data: Entry<any>): string[] => {
    const fieldNames: string[] = [];

    if (!data.fields) {
        return fieldNames;
    }

    return Object.keys(data.fields);
};

export const getDataConfigForContentType = (
    contentType: string,
    service: ContentfulNormalizerService
): ComponentDataConfig | null => {
    for (let i = 0; i < service.allUiComponents.length; i++) {
        const component = service.allUiComponents[i];

        if (component.contentType === contentType) {
            return component.component.data ?? null;
        }
    }

    return null;
};

export const getComponentKeyFromData = (
    data: Entry<any>,
    service: ContentfulNormalizerService
): string | null => {
    const contentType = getContentTypeFromData(data);

    if (!contentType) {
        return null;
    }

    for (let i = 0; i < service.allUiComponents.length; i++) {
        const component = service.allUiComponents[i];

        if (component.contentType === data.sys.contentType.sys.id) {
            return component.component.key;
        }
    }

    return null;
};

export const getContentTypeFromData = (data: Entry<any>): string | null => {
    if (
        !data ||
        !data.sys ||
        !data.sys.contentType ||
        !data.sys.contentType.sys ||
        !data.sys.contentType.sys.id
    ) {
        return null;
    }

    return data.sys.contentType.sys.id;
};

export const getContentTypeFromComponentKey = (
    componentKey: any,
    service: ContentfulNormalizerService
): string | null => {
    if ("string" !== typeof componentKey) {
        return null;
    }

    for (let i = 0; i < service.allUiComponents.length; i++) {
        const component = service.allUiComponents[i];
        if (component.component.key === componentKey) {
            return component.contentType;
        }
    }

    return null;
};

export const isArray = (dataType: any): dataType is [] => {
    return Array.isArray(dataType);
};

export const isComponentDataConfig = (dataType: any): dataType is ComponentDataConfig => {
    return !Array.isArray(dataType) && "object" === typeof dataType;
};

export const isArrayRelationType = (dataType: any): dataType is ArrayRelationType => {
    if (!dataType || !dataType.multiple) {
        return false;
    }

    if (
        TYPE_STRING === dataType.data ||
        TYPE_ASSET === dataType.data ||
        TYPE_LABELED_LINK === dataType.data
    ) {
        return true;
    }

    const typeOfData = typeof dataType.data;
    return (!Array.isArray(dataType) && "object" === typeOfData) || isArray(typeOfData);
};

export const isSingleRelationType = (dataType: any): dataType is SingleRelationType => {
    if (!dataType || !!dataType.multiple) {
        return false;
    }

    const typeOfData = typeof dataType.data;
    return (!Array.isArray(dataType) && "object" === typeOfData) || isArray(typeOfData);
};
