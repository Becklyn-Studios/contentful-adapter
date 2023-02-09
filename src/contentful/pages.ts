import { ContentfulClientApi } from "contentful";
import { ContentfulPage, OriginalPageData, SlugPage } from "./types";
import { findAllEntries, findOneEntry } from "./api";

export const loadPagePaths = async (
    client: ContentfulClientApi,
    contentType: string = "page"
): Promise<Array<string[]>> => {
    const pages = await findAllEntries<SlugPage>(client, {
        contentType,
        select: ["fields.slug"],
    });

    return pages.map(page => page.fields.slug.split("/").filter(part => "" !== part));
};

export const loadPageData = async (
    client: ContentfulClientApi,
    slug: string,
    contentType: string = "page"
): Promise<OriginalPageData> => {
    const page = await findOneEntry<ContentfulPage>(client, {
        contentType,
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
