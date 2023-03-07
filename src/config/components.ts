import { BaseComponentConfig, ComponentDataConfig, RelationType } from "@becklyn/ui-types";
import { ContentfulComponentConfig, UiComponentDataConfig } from "./types";
import { isBaseComponentConfig, isRelationType } from "../data/util";

export const getComponentDataConfig = (
    data?: (UiComponentDataConfig | BaseComponentConfig)[]
): ContentfulComponentConfig[] => {
    if (!data) {
        return [];
    }

    const configs: Record<string, ContentfulComponentConfig> = {};

    for (const config of data) {
        let currentConfig: ContentfulComponentConfig;

        if (isComponentDataConfig(config)) {
            const component = config.component;
            currentConfig = {
                key: component.key,
                contentType: config.contentType,
                data: getDataAndApplyChildConfigs(configs, component.data),
            };
        } else {
            currentConfig = {
                key: config.key,
                contentType: config.key,
                data: getDataAndApplyChildConfigs(configs, config.data),
            };
        }

        addConfigToConfigs(configs, currentConfig);
    }

    return Object.values(configs);
};

const addConfigToConfigs = (
    configs: Record<string, ContentfulComponentConfig>,
    newConfig: ContentfulComponentConfig
): void => {
    if (!configs[newConfig.key]) {
        configs[newConfig.key] = newConfig;
    }
};

const getDataAndApplyChildConfigs = (
    configs: Record<string, ContentfulComponentConfig>,
    dataConfig?: ComponentDataConfig
): ComponentDataConfig | undefined => {
    if (!dataConfig) {
        return dataConfig;
    }

    const cleanConfig: ComponentDataConfig = {};

    for (const field in dataConfig) {
        const fieldConfig = dataConfig[field];

        if (!isRelationType(fieldConfig)) {
            cleanConfig[field] = fieldConfig;
            continue;
        }

        getRelationTypeAndApplyChildConfigs(configs, cleanConfig, field, fieldConfig);
    }

    return cleanConfig;
};

const getRelationTypeAndApplyChildConfigs = (
    configs: Record<string, ContentfulComponentConfig>,
    cleanConfig: ComponentDataConfig,
    field: string,
    fieldConfig: RelationType
): void => {
    if ("string" === typeof fieldConfig.data || !fieldConfig.data) {
        cleanConfig[field] = {
            multiple: fieldConfig.multiple,
            data: fieldConfig.data,
        } as RelationType;
        return;
    }

    if (isBaseComponentConfig(fieldConfig.data)) {
        const cleanChildConfig = getDataAndApplyChildConfigs(configs, fieldConfig.data.data);

        if (cleanChildConfig) {
            addConfigToConfigs(configs, {
                key: fieldConfig.data.key,
                contentType: fieldConfig.data.key,
                data: cleanChildConfig,
            });
        }

        cleanConfig[field] = {
            multiple: fieldConfig.multiple,
            data: {
                key: fieldConfig.data.key,
                data: cleanChildConfig,
            },
        } as RelationType;
        return;
    }

    let cleanArrayConfig: (string | BaseComponentConfig)[] = [];

    for (const singleConfig of fieldConfig.data) {
        if ("string" === typeof singleConfig) {
            cleanArrayConfig = [...cleanArrayConfig, singleConfig];
            continue;
        }

        const cleanChildConfig = getDataAndApplyChildConfigs(configs, singleConfig.data);

        if (cleanChildConfig) {
            addConfigToConfigs(configs, {
                key: singleConfig.key,
                contentType: singleConfig.key,
                data: cleanChildConfig,
            });
        }

        cleanArrayConfig = [
            ...cleanArrayConfig,
            {
                key: singleConfig.key,
                data: cleanChildConfig,
            },
        ];
    }

    cleanConfig[field] = {
        multiple: fieldConfig.multiple,
        data: cleanArrayConfig,
    } as RelationType;
};

const isComponentDataConfig = (
    data: UiComponentDataConfig | BaseComponentConfig
): data is UiComponentDataConfig => {
    return (data as UiComponentDataConfig).contentType !== undefined;
};
