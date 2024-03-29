import { Asset as ContentfulAsset, Entry } from "contentful";
import { Asset, LabeledLink, LinkReference } from "@becklyn/ui-types";
import { PageCache } from "./cache";

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

export const getLabeledLinkFromContentful = async (
    pageCache: PageCache,
    data?: Entry<any> | null,
    pageContentType: string = "page"
): Promise<LabeledLink | null> => {
    if (!data) {
        return null;
    }

    const ref = data.fields.reference;

    let reference: LinkReference | null = {
        url: "",
        inNewTab: false,
    };

    if (ref.sys.contentType.sys.id === pageContentType) {
        reference.url = pageCache.getSlugOfPage(ref.sys.id);
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
