import { ContentfulNormalizerService } from "./service";
import { LabeledLink, LinkReference } from "@mayd/ui-types";
import { loadPageTree } from "../contentful/pages";
import { getPageSlug } from "../contentful/util";
import { findOneEntryBySys } from "../contentful/api";

export const normalizeLabeledLink = async (
    data: any,
    service: ContentfulNormalizerService
): Promise<LabeledLink | null> => {
    if (!data) {
        return null;
    }

    if (!data.fields) {
        // load missing data
        data = await findOneEntryBySys(data.sys, service.client, { depth: 10 });
    }

    if (!data || !data.fields || !data.fields.reference) {
        return null;
    }

    return {
        label: data.fields.label ?? null,
        reference: await normalizeReference(data.fields.reference, service),
    };
};

export const normalizeReference = async (
    data: any,
    service: ContentfulNormalizerService
): Promise<LinkReference | null> => {
    if (!data) {
        return null;
    }

    if (!data.fields) {
        // load missing data
        data = await findOneEntryBySys(data.sys, service.client, { depth: 10 });
    }

    if (!data || !data.fields) {
        return null;
    }

    if ("internalReference" === data.sys.contentType.sys.id) {
        // @todo: implement this when internal references are ready
        // @todo: allow fetching something else than just pages (use service for that)
        const pageTree = await loadPageTree(service.client);
        const pageSlug = getPageSlug(data.fields.page.sys.id, pageTree);

        return {
            title: data.fields.title ?? null,
            url: `/${pageSlug}`,
            inNewTab: data.fields.inNewTab ?? false,
        };
    }

    if ("externalReference" === data.sys.contentType.sys.id) {
        return {
            title: data.fields.title ?? null,
            url: data.fields.url ?? null,
            inNewTab: data.fields.inNewTab ?? false,
        };
    }

    return null;
};
