import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { IValidation } from "contentful-migration";

export const RTE_TYPE_HEADLINE = "headline";
export const RTE_TYPE_MINIMAL = "minimal";
export const RTE_TYPE_STYLED_FONT = "styled-font";
export const RTE_TYPE_STYLED_FONT_AND_LIST = "styled-font-list";
export const RTE_TYPE_FULL = "full";

export const getRteValidation = (version: string = RTE_TYPE_MINIMAL): Array<IValidation> => {
    if (version === RTE_TYPE_HEADLINE) {
        return [
            {
                size: {
                    max: 256,
                },
            },
        ];
    }

    const enabledMarks =
        version !== RTE_TYPE_MINIMAL ? [MARKS.BOLD, MARKS.ITALIC, MARKS.UNDERLINE] : [];

    const enabledNodeTypes =
        version !== RTE_TYPE_MINIMAL && version !== RTE_TYPE_STYLED_FONT
            ? [INLINES.ENTRY_HYPERLINK, INLINES.ASSET_HYPERLINK, BLOCKS.UL_LIST]
            : [INLINES.ENTRY_HYPERLINK, INLINES.ASSET_HYPERLINK];

    // @todo: full RTE (include inline images);

    return [
        { enabledMarks },
        { enabledNodeTypes },
        {
            nodes: {
                [INLINES.ENTRY_HYPERLINK]: [
                    {
                        linkContentType: ["internalReference", "externalReference"],
                    },
                ],
            },
        },
    ];
};
