import { ContentfulClientApi } from "contentful";
import {
    ContentfulBasePage,
    ContentfulEntry,
    ContentfulPage,
    PageProps,
    PageTreeNode,
} from "./types";
import { findEntriesByIds, findOneEntry } from "./api";
import { findPageBySlugInTree } from "./util";

export const loadPagePaths = async (client: ContentfulClientApi): Promise<Array<string[]>> => {
    return getSlugPathsFromPageTree(await loadPageTree(client));
};

export const loadPageData = async (
    client: ContentfulClientApi,
    slugParts: string[]
): Promise<PageProps> => {
    const pageTree = await loadPageTree(client);
    const pageNode = findPageBySlugInTree(slugParts, pageTree);

    if (null === pageNode) {
        return {
            pageTree,
            notFound: true,
        };
    }

    const data = findOneEntry<ContentfulPage>(client, {
        contentType: "page",
        where: {
            "sys.id": pageNode.id,
        },
        throwError: false,
    });

    if (null === data) {
        return {
            pageTree,
            notFound: true,
        };
    }

    return {
        pageTree,
    };
};

export const getSlugPathsFromPageTree = (
    treeNode: PageTreeNode,
    parentPath: string[] = [],
    paths: Array<string[]> = []
): Array<string[]> => {
    const pagePath = treeNode.slug ? [...parentPath, treeNode.slug] : [...parentPath];
    paths = [...paths, pagePath];

    treeNode.children.forEach(child => {
        paths = getSlugPathsFromPageTree(child, pagePath, paths);
    });

    return paths;
};

export const loadPageTree = async (
    client: ContentfulClientApi,
    page?: ContentfulEntry<ContentfulBasePage>
): Promise<PageTreeNode> => {
    page = !!page ? page : await findRootPage(client);

    const slug = page.fields && page.fields.slug ? page.fields.slug : null;
    const childPages = await findChildPages(client, page);
    const childNodes: PageTreeNode[] = [];

    for (let i = 0; i < childPages.length; i++) {
        childNodes.push(await loadPageTree(client, childPages[i]));
    }

    return {
        id: page.sys.id,
        slug,
        children: childNodes,
    };
};

export const findRootPage = async (
    client: ContentfulClientApi
): Promise<ContentfulEntry<ContentfulBasePage>> => {
    const page = await findOneEntry<ContentfulBasePage>(client, {
        contentType: "page",
        select: ["fields.slug", "fields.childPages"],
        where: {
            "fields.slug": "/",
        },
    });

    if (null === page) {
        throw new Error("Did not find root page");
    }

    return page;
};

const findChildPages = async (
    client: ContentfulClientApi,
    parentPage: ContentfulEntry<ContentfulBasePage>
): Promise<ContentfulEntry<ContentfulBasePage>[]> => {
    const childIds = getChildIdArray(parentPage);

    if (0 === childIds.length) {
        return [];
    }

    return await findEntriesByIds<ContentfulBasePage>(client, {
        contentType: "page",
        select: ["fields.slug", "fields.childPages"],
        ids: childIds,
    });
};

const getChildIdArray = (page: ContentfulEntry<ContentfulBasePage>): string[] => {
    const sysIds: string[] = [];

    if (page.fields && page.fields.childPages) {
        page.fields.childPages.forEach(child => sysIds.push(child.sys.id));
    }

    return sysIds;
};
