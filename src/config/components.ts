import { UiComponentDataConfig } from "./types";
import { BaseComponentConfig } from "@mayd/ui-types";

export const getComponentDataConfig = (
    data?: (UiComponentDataConfig | BaseComponentConfig<any>)[]
): UiComponentDataConfig[] => {
    return data
        ? data.map(component =>
              isComponentDataConfig(component)
                  ? component
                  : {
                        component,
                        contentType: component.key,
                    }
          )
        : [];
};

const isComponentDataConfig = (
    data: UiComponentDataConfig | BaseComponentConfig<any>
): data is UiComponentDataConfig => {
    return (data as UiComponentDataConfig).contentType !== undefined;
};
