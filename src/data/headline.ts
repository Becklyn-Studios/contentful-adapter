import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

export const getHeadlineString = (data: any): string | null => {
    if (!data) {
        return null;
    }

    let paragraphs: string[] = [];

    documentToHtmlString(data, {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, next) => {
                paragraphs = [...paragraphs, `${next(node.content)}`];
                return "";
            },
        },
    });

    return paragraphs.join("<br/>");
};
