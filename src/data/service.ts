import { ContentfulClientApi } from "contentful";
import { PageTreeNode } from "../contentful/types";
import { MaydContentfulAdapterConfig, UiComponentDataConfig } from "../config/types";
import { connectToContentfulDeliveryApi } from "../contentful/api";
import { loadPageTree } from "../contentful/pages";

export interface ContentfulNormalizerService {
    client: ContentfulClientApi;
    getPageTree: () => Promise<PageTreeNode>;
    allUiComponents: UiComponentDataConfig[];
}

export const getContentfulNormalizerService = (
    config: MaydContentfulAdapterConfig
): ContentfulNormalizerService => {
    const contentfulClient = connectToContentfulDeliveryApi(config.clientConfig);
    let pageTree: PageTreeNode | null = null;

    return {
        allUiComponents: config.components,
        client: contentfulClient,
        getPageTree: async () => {
            if (!pageTree) {
                pageTree = await loadPageTree(contentfulClient);
            }

            return pageTree;
        },
    };
};
