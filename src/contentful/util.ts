import { Asset as ContentfulAsset } from "contentful";
import { DetailedContentfulEntry, PageTreeNode } from "./types";
import { Asset, LabeledLink, LinkReference } from "@mayd/ui-types";
import page from "../migrations/websites/page";

export const getContentfulSelectString = (select?: string[]): string | null => {
    if (!select) {
        return null;
    }

    if (!select.includes("sys.id")) {
        select.unshift("sys.id");
    }

    return select.join(",");
};

export const getContentfulWhereObject = (
    where?: Record<string, string>
): Record<string, string> => {
    return !!where ? where : {};
};

export const getAssetFromContentful = (data?: ContentfulAsset | null): Asset | null => {
    if (!data) {
        return null;
    }

    return {
        url: data.fields.file.url,
        contentType: data.fields.file.contentType,
        title: data.fields.title,
        height: data.fields.file.details.image?.height,
        width: data.fields.file.details.image?.width,
    };
};

export const getLabeledLinkFromContentful = (
    pageTree: PageTreeNode,
    data?: DetailedContentfulEntry<any> | null
): LabeledLink | null => {
    if (!data) {
        return null;
    }

    const ref = data.fields.reference;

    let reference: LinkReference | null = {
        url: "",
        inNewTab: false,
    };

    if (ref.sys.contentType.sys.id === "page") {
        reference.url = getPageSlug(ref.sys.id, pageTree);
    } else if (ref.sys.contentType.sys.id === "externalReference" && ref.fields.url) {
        reference.url = ref.fields.url;
        reference.inNewTab = ref.fields.inNewTab ?? false;
    } else {
        reference = null;
    }

    return {
        label: data.fields.label ?? null,
        reference,
    };
};

export const getPageSlug = (pageId: string, pageTree: PageTreeNode): string => {
    const page = findPageInTree(pageId, pageTree);
    const slugParts = getSlugPartsOfPageTreeNode(page);

    return 0 !== slugParts.length ? slugParts.join("/") : "/";
};

export const getSlugPartsOfPageTreeNode = (
    page: PageTreeNode | null,
    parts: string[] = []
): string[] => {
    if (null === page) {
        return [];
    }

    if (!page.parent) {
        return page.slug ? [page.slug, ...parts] : parts;
    }

    return getSlugPartsOfPageTreeNode(page.parent, page.slug ? [page.slug] : []);
};

export const findPageInTree = (pageId: string, pageTree: PageTreeNode): PageTreeNode | null => {
    if (pageTree.id === pageId) {
        return pageTree;
    }

    for (let i = 0; i < pageTree.children.length; i++) {
        const foundInChild = findPageInTree(pageId, pageTree.children[i]);

        if (null !== foundInChild) {
            return foundInChild;
        }
    }

    return null;
};

export const findPageBySlugInTree = (
    slugParts: string[],
    pageTree: PageTreeNode
): PageTreeNode | null => {
    if (slugParts.length === 0) {
        return pageTree;
    }

    const part = slugParts.shift();

    for (let i = 0; i < pageTree.children.length; i++) {
        const child = pageTree.children[i];

        if (child.slug === part) {
            return findPageBySlugInTree(slugParts, child);
        }
    }

    return null;
};
