import { BaseComponentConfig, ComponentDataConfig, RelationType } from "@mayd/ui-types";
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

        if (isBaseComponentConfig(fieldConfig.data)) {
            const cleanData = getDataAndApplyChildConfigs(configs, fieldConfig.data.data);
            const newConfig: ContentfulComponentConfig = {
                key: fieldConfig.data.key,
                contentType: fieldConfig.data.key,
                data: cleanData,
            };

            addConfigToConfigs(configs, newConfig);

            cleanConfig[field] = {
                multiple: fieldConfig.multiple,
                data: cleanData,
            } as RelationType;
            continue;
        }

        cleanConfig[field] = fieldConfig;
    }

    return cleanConfig;
};

const isComponentDataConfig = (
    data: UiComponentDataConfig | BaseComponentConfig
): data is UiComponentDataConfig => {
    return (data as UiComponentDataConfig).contentType !== undefined;
};
