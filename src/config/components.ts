import { BaseComponentConfig } from "@mayd/ui-types";
import { ContentfulComponentConfig, UiComponentDataConfig } from "./types";
import { isBaseComponentConfig, isRelationType } from "../data/util";

export const getComponentDataConfig = (
    data?: (UiComponentDataConfig | BaseComponentConfig<any>)[]
): ContentfulComponentConfig[] => {
    if (!data) {
        return [];
    }

    let configs: Record<string, ContentfulComponentConfig> = {};

    for (const config of data) {
        let currentConfig: ContentfulComponentConfig;

        if (isComponentDataConfig(config)) {
            const component = config.component;
            currentConfig = {
                key: component.key,
                contentType: config.contentType,
                data: component.data,
            };
        } else {
            currentConfig = {
                key: config.key,
                contentType: config.key,
                data: config.data,
            };
        }

        configs = addConfigToConfigs(configs, currentConfig);
    }

    return Object.values(configs);
};

const addConfigToConfigs = (
    configs: Record<string, ContentfulComponentConfig>,
    newConfig: ContentfulComponentConfig
): Record<string, ContentfulComponentConfig> => {
    if (!configs[newConfig.key]) {
        configs[newConfig.key] = newConfig;
    }

    configs = addChildConfigsToConfig(configs, newConfig);

    return configs;
};

const addChildConfigsToConfig = (
    configs: Record<string, ContentfulComponentConfig>,
    config: ContentfulComponentConfig
): Record<string, ContentfulComponentConfig> => {
    for (const field in config.data) {
        const dataConfig = config.data[field];

        if (isRelationType(dataConfig) && isBaseComponentConfig(dataConfig.data)) {
            const newConfig: ContentfulComponentConfig = {
                key: dataConfig.data.key,
                contentType: dataConfig.data.key,
                data: dataConfig.data.data,
            };

            configs = addConfigToConfigs(configs, newConfig);
        }
    }

    return configs;
};

const isComponentDataConfig = (
    data: UiComponentDataConfig | BaseComponentConfig<any>
): data is UiComponentDataConfig => {
    return (data as UiComponentDataConfig).contentType !== undefined;
};
