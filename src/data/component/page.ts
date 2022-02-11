import { BaseComponentConfig, TYPE_BOOL, TYPE_STRING } from "@mayd/ui-types";
import React from "react";

export const getPageConfig = (
    contentComponentKeys: string[],
    basePageComponent: React.FC<any>
): BaseComponentConfig<any> => {
    return {
        key: "page",
        Component: basePageComponent,
        data: {
            title: TYPE_STRING,
            slug: TYPE_STRING,
            seo: {
                multiple: false,
                data: {
                    title: TYPE_STRING,
                    description: TYPE_STRING,
                    keywords: {
                        data: TYPE_STRING,
                        multiple: true,
                    },
                    no_index: TYPE_BOOL,
                    no_follow: TYPE_BOOL,
                },
            },
            content: {
                multiple: false,
                data: contentComponentKeys,
            },
        },
    };
};
