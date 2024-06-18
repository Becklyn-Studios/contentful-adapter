import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { IValidation } from "contentful-migration";

export const RTE_TYPE_HEADLINE = "headline";
export const RTE_TYPE_MINIMAL = "minimal";
export const RTE_TYPE_STYLED_FONT = "styled-font";
export const RTE_TYPE_STYLED_FONT_AND_LIST = "styled-font-list";
export const RTE_TYPE_FULL = "full";
export const RTE_TYPE_TABLE = "table";
export const RTE_TYPE_MARKS = "marks";

export const getRteValidation = (version: string = RTE_TYPE_MINIMAL): Array<IValidation> => {
    if (version === RTE_TYPE_HEADLINE) {
        return [
            {
                size: {
                    max: 256,
                },
            },
            {
                enabledMarks: [],
            },
            {
                enabledNodeTypes: [],
            },
            {
                nodes: {},
            },
        ];
    }

    if (version === RTE_TYPE_MARKS) {
        return [
            {
                size: {
                    max: 256,
                },
            },
            {
                enabledMarks: [MARKS.BOLD, MARKS.ITALIC, MARKS.UNDERLINE, MARKS.CODE],
            },
            {
                enabledNodeTypes: [],
            },
            {
                nodes: {},
            },
        ];
    }

    const enabledMarks: string[] =
        version !== RTE_TYPE_MINIMAL ? [MARKS.BOLD, MARKS.ITALIC, MARKS.UNDERLINE, MARKS.CODE] : [];

    let enabledNodeTypes =
        version === RTE_TYPE_TABLE
            ? [BLOCKS.TABLE]
            : version !== RTE_TYPE_MINIMAL && version !== RTE_TYPE_STYLED_FONT
              ? [
                    INLINES.HYPERLINK,
                    INLINES.ENTRY_HYPERLINK,
                    INLINES.ASSET_HYPERLINK,
                    BLOCKS.UL_LIST,
                ]
              : [INLINES.HYPERLINK, INLINES.ENTRY_HYPERLINK, INLINES.ASSET_HYPERLINK];

    if (version === RTE_TYPE_FULL) {
        enabledNodeTypes = [
            ...enabledNodeTypes,
            INLINES.EMBEDDED_ENTRY,
            BLOCKS.HR,
            BLOCKS.EMBEDDED_ENTRY,
            BLOCKS.HEADING_2,
            BLOCKS.HEADING_3,
            BLOCKS.TABLE,
        ];
    }

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
                [BLOCKS.EMBEDDED_ENTRY]: [
                    {
                        linkContentType: [
                            "rteMedia",
                            "rteMediaSlider",
                            "rteQuote",
                            "rteIcon",
                            "rteHint",
                            "rteImage",
                        ],
                    },
                ],
            },
        },
    ];
};
