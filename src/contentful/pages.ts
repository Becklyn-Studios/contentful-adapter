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

// export const getSlugPathsFromPageTree = (
//     treeNode: PageTreeNode,
//     parentPath: string[] = [],
//     paths: Array<string[]> = []
// ): Array<string[]> => {
//     const pagePath = treeNode.slug ? [...parentPath, treeNode.slug] : [...parentPath];
//     paths = [...paths, pagePath];
//
//     treeNode.children.forEach(child => {
//         paths = getSlugPathsFromPageTree(child, pagePath, paths);
//     });
//
//     return paths;
// };

// export const loadPageTree = async (
//     client: ContentfulClientApi,
//     page?: Entry<ContentfulBasePage>
// ): Promise<PageTreeNode> => {
//     page = !!page ? page : await findRootPage(client);
//
//     const slug = page.fields && page.fields.slug ? page.fields.slug : null;
//     const title = page.fields && page.fields.title ? page.fields.title : null;
//     const childPages = await findChildPages(client, page);
//
//     const parentPage: PageTreeNode = {
//         id: page.sys.id,
//         slug: "/" === slug ? null : slug,
//         title,
//         children: [],
//     };
//
//     for (let i = 0; i < childPages.length; i++) {
//         const childPage = await loadPageTree(client, childPages[i]);
//         childPage.parent = parentPage;
//         parentPage.children.push(childPage);
//     }
//
//     return parentPage;
// };

// export const findPageBySlug = async (
//     client: ContentfulClientApi,
//     slug: string
// ): Promise<Entry<ContentfulPage>> => {
//     const page = await findOneEntry<ContentfulPage>(client, {
//         contentType: "page",
//         where: {
//             "fields.slug": slug,
//         },
//         throwError: false,
//         depth: 10,
//     });
//
//     if (null === page) {
//         throw new Error(`Did not find page for slug ${slug}`);
//     }
//
//     return page;
// };

// export const findRootPage = async (
//     client: ContentfulClientApi
// ): Promise<Entry<ContentfulBasePage>> => {
//     const page = await findOneEntry<ContentfulBasePage>(client, {
//         contentType: "page",
//         select: ["fields.slug", "fields.title", "fields.childPages"],
//         where: {
//             "fields.slug": "/",
//         },
//     });
//
//     if (null === page) {
//         throw new Error("Did not find root page");
//     }
//
//     return page;
// };

// const findChildPages = async (
//     client: ContentfulClientApi,
//     parentPage: Entry<ContentfulBasePage>
// ): Promise<Entry<ContentfulBasePage>[]> => {
//     const childIds = getChildIdArray(parentPage);
//
//     if (0 === childIds.length) {
//         return [];
//     }
//
//     return await findEntriesByIds<ContentfulBasePage>(client, {
//         contentType: "page",
//         select: ["fields.slug", "fields.title", "fields.childPages"],
//         ids: childIds,
//     });
// };

// const getChildIdArray = (page: Entry<ContentfulBasePage>): string[] => {
//     const sysIds: string[] = [];
//
//     if (page.fields && page.fields.childPages) {
//         page.fields.childPages.forEach(child => sysIds.push(child.sys.id));
//     }
//
//     return sysIds;
// };
