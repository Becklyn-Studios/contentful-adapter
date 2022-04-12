import { NodeData } from "@contentful/rich-text-types/dist/types/types";
import { ContentfulNormalizerService } from "./service";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { normalizeReference } from "./reference";
import { normalizeAssetData } from "./asset";
import safeJsonStringify from "safe-json-stringify";
import { ReferencesData, RteData } from "../contentful/types";
import { normalizeData } from "./normalizer";

export const addAssetToReferenceList = async (
    references: ReferencesData,
    data: NodeData,
    service: ContentfulNormalizerService
): Promise<ReferencesData> => {
    if (!data || !data.target || !data.target.sys || !data.target.sys.id) {
        return references;
    }

    const id = data.target.sys.id;

    if (references[id]) {
        return references;
    }

    const asset = await normalizeAssetData(data.target, service);

    if (null === asset) {
        return references;
    }

    references[id] = asset;

    return references;
};

const addReferenceToReferenceList = async (
    references: ReferencesData,
    data: NodeData,
    service: ContentfulNormalizerService
): Promise<ReferencesData> => {
    if (!data || !data.target || !data.target.sys) {
        return references;
    }

    const id = data.target.sys.id;

    if (references[id]) {
        return references;
    }

    const reference = await normalizeReference(data.target, service);

    if (null === reference) {
        return references;
    }

    references[id] = reference;

    return references;
};

const addEntryToEntryList = async (
    entries: ReferencesData,
    data: NodeData,
    service: ContentfulNormalizerService
): Promise<ReferencesData> => {
    if (!data || !data.target || !data.target.sys) {
        return entries;
    }

    const id = data.target.sys.id;

    if (entries[id]) {
        return entries;
    }

    const entry = await normalizeData(data.target, service);

    if (null === entry) {
        return entries;
    }

    entries[id] = entry;

    return entries;
};

export const getRteData = async (
    data: any,
    service: ContentfulNormalizerService
): Promise<RteData | null> => {
    if (!data) {
        return null;
    }

    let assetReferences: any[] = [];
    let linkReferences: any[] = [];
    let entryReferences: any[] = [];

    documentToHtmlString(data, {
        renderNode: {
            [INLINES.ASSET_HYPERLINK]: node => {
                assetReferences = [...assetReferences, node.data];
                return "";
            },
            [INLINES.ENTRY_HYPERLINK]: node => {
                // @todo: maybe remove again after absolute slug optimization
                if ("internalReference" === node.data?.target?.sys?.contentType?.sys?.id) {
                    delete node.data.target.fields;
                }

                linkReferences = [...linkReferences, node.data];
                return "";
            },
            [BLOCKS.EMBEDDED_ENTRY]: node => {
                entryReferences = [...entryReferences, node.data];
                return "";
            },
            [BLOCKS.EMBEDDED_ASSET]: node => {
                assetReferences = [...assetReferences, node.data];
                return "";
            },
        },
    });

    let references: ReferencesData = {};
    let entries: Record<string, any> = {};

    for (let i = 0; i < assetReferences.length; i++) {
        references = await addAssetToReferenceList(references, assetReferences[i], service);
    }

    for (let i = 0; i < linkReferences.length; i++) {
        references = await addReferenceToReferenceList(references, linkReferences[i], service);
    }

    for (let i = 0; i < entryReferences.length; i++) {
        entries = await addEntryToEntryList(entries, entryReferences[i], service);
    }

    return {
        json: JSON.parse(safeJsonStringify(data)),
        references,
        entries,
    };
};
