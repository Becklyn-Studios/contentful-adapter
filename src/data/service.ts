import { ContentfulClientApi } from "contentful";
import { PageTreeNode } from "../contentful/types";
import { ContentfulComponentConfig, MaydContentfulAdapterConfig } from "../config/types";
import { connectToContentfulDeliveryApi } from "../contentful/api";
import { loadPageTree } from "../contentful/pages";
import { getPageSlug } from "../contentful/util";

export interface ContentfulNormalizerService {
    client: ContentfulClientApi;
    getPageTree: () => Promise<PageTreeNode>;
    allUiComponents: ContentfulComponentConfig[];
    resolveInternalReferencePath: (data: any) => Promise<string | null>;
    getThemeValue: (contentfulValue: string) => string;
    getVersionValue: (contentfulValue: string) => string;
    registerNormalizerType: (dataType: string, normalizer: DataTypeNormalizer) => void;
    getCustomNormalizer: (dataType: string) => DataTypeNormalizer | null;
}

export type DataTypeNormalizer = (data: any, service: ContentfulNormalizerService) => Promise<any>;

export type InternalReferenceResolver = (
    data: any,
    pageTree: PageTreeNode
) => Promise<string | null>;

export const getContentfulNormalizerService = (
    config: MaydContentfulAdapterConfig,
    themeValueMapping: Record<string, string> = {},
    versionValueMapping: Record<string, string> = {},
    referenceResolvers?: Record<string, InternalReferenceResolver>,
    preview: boolean = false
): ContentfulNormalizerService => {
    const contentfulClient = connectToContentfulDeliveryApi(config.clientConfig, preview);
    let pageTree: PageTreeNode | null = null;
    let customNormalizers: Record<string, DataTypeNormalizer> = {};

    const getPageTree = async () => {
        if (!pageTree) {
            pageTree = await loadPageTree(contentfulClient);
        }

        return pageTree;
    };

    const internalReferenceResolvers = getInternalReferenceResolvers(referenceResolvers);

    return {
        allUiComponents: config.components,
        client: contentfulClient,
        getThemeValue: (contentfulValue: string) => {
            const mappedValue = themeValueMapping[contentfulValue];
            return mappedValue ? mappedValue : contentfulValue;
        },
        getVersionValue: (contentfulValue: string) => {
            const mappedValue = versionValueMapping[contentfulValue];
            return mappedValue ? mappedValue : contentfulValue;
        },
        getPageTree,
        resolveInternalReferencePath: async (data: any): Promise<string | null> => {
            if (!data || !data.sys || !data.sys.contentType) {
                return null;
            }

            const currentPageTree = await getPageTree();
            const contentType = data.sys.contentType.sys.id;
            const resolver = internalReferenceResolvers[contentType];

            return resolver ? await resolver(data, currentPageTree) : null;
        },
        registerNormalizerType: (dataType: string, normalizer: DataTypeNormalizer) => {
            if (customNormalizers[dataType]) {
                throw new Error(`DataTypeNormalizer for dataType ${dataType} already exists`);
            }

            customNormalizers[dataType] = normalizer;
        },
        getCustomNormalizer: (dataType: string): DataTypeNormalizer | null => {
            return customNormalizers[dataType] ?? null;
        },
    };
};

const getInternalReferenceResolvers = (
    resolvers: Record<string, InternalReferenceResolver> = {}
): Record<string, InternalReferenceResolver> => {
    const referenceResolvers: Record<string, InternalReferenceResolver> = {
        ...resolvers,
    };

    if (!referenceResolvers["page"]) {
        referenceResolvers["page"] = async (
            data: any,
            pageTree: PageTreeNode
        ): Promise<string | null> => {
            if (!data || !data.sys || !data.sys.id) {
                return null;
            }

            return getPageSlug(data.sys.id, pageTree);
        };
    }

    return referenceResolvers;
};
