import { ContentfulClientApi } from "contentful";
import { PageTreeNode } from "../contentful/types";
import { MaydContentfulAdapterConfig, UiComponentDataConfig } from "../config/types";
import { connectToContentfulDeliveryApi } from "../contentful/api";
import { loadPageTree } from "../contentful/pages";
import { getPageSlug } from "../contentful/util";

export interface ContentfulNormalizerService {
    client: ContentfulClientApi;
    getPageTree: () => Promise<PageTreeNode>;
    allUiComponents: UiComponentDataConfig[];
    resolveInternalReferencePath: (data: any) => Promise<string | null>;
    getThemeValue: (contentfulValue: string) => string;
    getVersionValue: (contentfulValue: string) => string;
}

export type InternalReferenceResolver = (
    data: any,
    pageTree: PageTreeNode
) => Promise<string | null>;

export const getContentfulNormalizerService = (
    config: MaydContentfulAdapterConfig,
    themeValueMapping: Record<string, string> = {},
    versionValueMapping: Record<string, string> = {},
    referenceResolvers?: Record<string, InternalReferenceResolver>
): ContentfulNormalizerService => {
    const contentfulClient = connectToContentfulDeliveryApi(config.clientConfig);
    let pageTree: PageTreeNode | null = null;

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
