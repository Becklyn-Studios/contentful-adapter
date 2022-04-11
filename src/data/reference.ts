import { ContentfulNormalizerService } from "./service";
import { LabeledLink, LinkReference } from "@mayd/ui-types";
import { findOneEntryBySys } from "../contentful/api";
import { getValueOfField } from "./util";

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
        label: getValueOfField(data.fields.label, service.locale) ?? null,
        reference: await normalizeReference(
            getValueOfField(data.fields.reference, service.locale),
            service
        ),
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
        const referenceSlug = await service.resolveInternalReferencePath(
            getValueOfField(data.fields.reference, service.locale)
        );

        if (null === referenceSlug) {
            return null;
        }

        const anchor = getValueOfField(data.fields.anchor, service.locale)
            ? `#${getValueOfField(data.fields.anchor, service.locale)}`
            : "";

        return {
            title: getValueOfField(data.fields.title, service.locale) ?? null,
            url: "/" === referenceSlug ? referenceSlug + anchor : `/${referenceSlug}${anchor}`,
            inNewTab: getValueOfField(data.fields.inNewTab, service.locale) ?? false,
        };
    }

    if ("externalReference" === data.sys.contentType.sys.id) {
        return {
            title: getValueOfField(data.fields.title, service.locale) ?? null,
            url: getValueOfField(data.fields.url, service.locale) ?? null,
            inNewTab: getValueOfField(data.fields.inNewTab, service.locale) ?? false,
        };
    }

    if ("assetReference" === data.sys.contentType.sys.id) {
        return {
            title: getValueOfField(data.fields.title, service.locale) ?? null,
            url: getValueOfField(data.fields.asset?.fields?.file?.url, service.locale) ?? null,
            inNewTab: true,
        };
    }

    return null;
};
