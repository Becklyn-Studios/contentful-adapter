import { BaseComponentConfig } from "@mayd/ui-types";
import { ContentfulComponentConfig, UiComponentDataConfig } from "./types";

export const getComponentDataConfig = (
    data?: (UiComponentDataConfig | BaseComponentConfig<any>)[]
): ContentfulComponentConfig[] => {
    if (!data) {
        return [];
    }

    const configs: ContentfulComponentConfig[] = [];

    for (const config of data) {
        if (isComponentDataConfig(config)) {
            const component = config.component;

            configs.push({
                key: component.key,
                contentType: config.contentType,
                data: component.data,
            });
        } else {
            configs.push({
                key: config.key,
                contentType: config.key,
                data: config.data,
            });
        }
    }

    return configs;
};

const isComponentDataConfig = (
    data: UiComponentDataConfig | BaseComponentConfig<any>
): data is UiComponentDataConfig => {
    return (data as UiComponentDataConfig).contentType !== undefined;
};
