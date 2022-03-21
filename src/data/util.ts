import { Entry } from "contentful";
import {
    ArrayRelationType,
    BaseComponentConfig,
    ComponentDataConfig,
    RelationType,
    SingleRelationType,
    TYPE_ASSET,
    TYPE_BOOL,
    TYPE_LABELED_LINK,
    TYPE_NUMBER,
    TYPE_RTE,
    TYPE_STRING,
} from "@mayd/ui-types";
import { ContentfulNormalizerService } from "./service";

export const getDataFieldNames = (data: Entry<any>, dataConfig: ComponentDataConfig): string[] => {
    const fieldNames: string[] = [];

    if (!data.fields) {
        return fieldNames;
    }

    const dataFields = Object.keys(data.fields);
    const customFields = getCustomDataTypeFields(dataConfig);

    return dataFields.concat(...customFields.filter(field => !dataFields.includes(field)));
};

const getCustomDataTypeFields = (dataConfig: ComponentDataConfig) => {
    return Object.keys(dataConfig).filter(key => {
        const dataType = dataConfig[key];

        if ("string" !== typeof dataType) {
            return false;
        }

        return (
            dataType !== TYPE_STRING &&
            dataType !== TYPE_BOOL &&
            dataType !== TYPE_NUMBER &&
            dataType !== TYPE_RTE &&
            dataType !== TYPE_ASSET &&
            dataType !== TYPE_LABELED_LINK
        );
    });
};

export const getDataConfigForContentType = (
    contentType: string,
    service: ContentfulNormalizerService
): ComponentDataConfig | null => {
    for (let i = 0; i < service.allUiComponents.length; i++) {
        const component = service.allUiComponents[i];

        if (component.contentType === contentType) {
            return component.data ?? null;
        }
    }

    return null;
};

export const getIdFromData = (data: Entry<any>): string | null => {
    return data && data.sys ? data.sys.id : null;
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
            return component.key;
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
        if (component.key === componentKey) {
            return component.contentType;
        }
    }

    return null;
};

export const isArray = (dataType: any): dataType is [] => {
    return Array.isArray(dataType);
};

export const isBaseComponentConfig = (dataType: any): dataType is BaseComponentConfig => {
    return !Array.isArray(dataType) && "object" === typeof dataType;
};

export const isRelationType = (dataType: any): dataType is RelationType => {
    return isArrayRelationType(dataType) || isSingleRelationType(dataType);
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

export const getValueOfField = (data: any, locale: string) => {
    return "object" === typeof data && Object.keys(data).includes(locale) ? data[locale] : data;
};
