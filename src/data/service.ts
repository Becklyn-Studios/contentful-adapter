import { ContentfulClientApi } from "contentful";
import { ContentfulComponentConfig, ContentfulAdapterConfig } from "../config/types";
import { connectToContentfulDeliveryApi, findAllEntries } from "../contentful/api";
import { getPageCache, PageCache } from "../contentful/cache";
import { PageForCache } from "../contentful/types";

export interface ContentfulNormalizerService {
    client: ContentfulClientApi;
    locale: string;
    pageCache: PageCache;
    allUiComponents: ContentfulComponentConfig[];
    resolveInternalReferencePath: (data: any) => Promise<string | null>;
    getThemeValue: (contentfulValue: string) => string;
    getVersionValue: (contentfulValue: string) => string;
    registerNormalizerType: (dataType: string, normalizer: DataTypeNormalizer) => void;
    getCustomNormalizer: (dataType: string) => DataTypeNormalizer | null;
}

export type DataTypeNormalizer = (
    data: any,
    service: ContentfulNormalizerService,
    parentData?: any
) => Promise<any>;

export type InternalReferenceResolver = (data: any, pageCache: PageCache) => Promise<string | null>;

export const getContentfulNormalizerService = async (
    config: ContentfulAdapterConfig,
    locale: string,
    themeValueMapping: Record<string, string> = {},
    versionValueMapping: Record<string, string> = {},
    referenceResolvers?: Record<string, InternalReferenceResolver>,
    preview: boolean = false,
    pageContentType: string = "page"
): Promise<ContentfulNormalizerService> => {
    const contentfulClient = connectToContentfulDeliveryApi(config.clientConfig, preview);
    const pages = await findAllEntries<PageForCache>(contentfulClient, {
        contentType: pageContentType,
        select: ["fields.slug", "fields.title"],
    });
    const pageCache = getPageCache(pages);
    let customNormalizers: Record<string, DataTypeNormalizer> = {};

    const internalReferenceResolvers = getInternalReferenceResolvers(
        referenceResolvers,
        pageContentType
    );

    return {
        allUiComponents: config.components,
        client: contentfulClient,
        locale,
        getThemeValue: (contentfulValue: string) => {
            const mappedValue = themeValueMapping[contentfulValue];
            return mappedValue ? mappedValue : contentfulValue;
        },
        getVersionValue: (contentfulValue: string) => {
            const mappedValue = versionValueMapping[contentfulValue];
            return mappedValue ? mappedValue : contentfulValue;
        },
        pageCache,
        resolveInternalReferencePath: async (data: any): Promise<string | null> => {
            if (!data || !data.sys || !data.sys.contentType) {
                return null;
            }

            const contentType = data.sys.contentType.sys.id;
            const resolver = internalReferenceResolvers[contentType];

            return resolver ? await resolver(data, pageCache) : null;
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
    resolvers: Record<string, InternalReferenceResolver> = {},
    pageContentType: string = "page"
): Record<string, InternalReferenceResolver> => {
    const referenceResolvers: Record<string, InternalReferenceResolver> = {
        ...resolvers,
    };

    if (!referenceResolvers[pageContentType]) {
        referenceResolvers[pageContentType] = async (
            data: any,
            pageCache: PageCache
        ): Promise<string | null> => {
            if (!data || !data.sys || !data.sys.id) {
                return null;
            }

            return pageCache.getSlugOfPage(data.sys.id);
        };
    }

    return referenceResolvers;
};
