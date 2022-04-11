import { ContentfulClientApi } from "contentful";
import { ContentfulPage, OriginalPageData, SlugPage } from "./types";
import { findAllEntries, findOneEntry } from "./api";

export const loadPagePaths = async (client: ContentfulClientApi): Promise<Array<string[]>> => {
    const pages = await findAllEntries<SlugPage>(client, {
        contentType: "page",
        select: ["fields.slug"],
    });

    return pages.map(page => page.fields.slug.split("/").filter(part => "" !== part));
};

export const loadPageData = async (
    client: ContentfulClientApi,
    slug: string
): Promise<OriginalPageData> => {
    const page = await findOneEntry<ContentfulPage>(client, {
        contentType: "page",
        where: {
            "fields.slug": slug,
        },
        throwError: false,
        depth: 10,
    });

    if (null === page) {
        return {
            notFound: true,
        };
    }

    return {
        page,
    };
};
