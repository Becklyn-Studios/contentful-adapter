import { BaseComponentConfig, TYPE_BOOL, TYPE_STRING } from "@mayd/ui-types";

export const getPageConfig = (contentComponentKeys: string[]): BaseComponentConfig => {
    return {
        key: "page",
        data: {
            title: TYPE_STRING,
            slug: TYPE_STRING,
            seo: {
                multiple: false,
                data: SeoConfig,
            },
            content: {
                multiple: false,
                data: contentComponentKeys,
            },
        },
    };
};

export const SeoConfig: BaseComponentConfig = {
    key: "blockTabSectionTextImage",
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
};
