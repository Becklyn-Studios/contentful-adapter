//region config
export { getComponentDataConfig } from "./config/components";

export type {
    ContentfulClientConfig,
    MaydContentfulAdapterConfig,
    MaydContentfulAdapterConfigFile,
    UiComponentDataConfig,
    BackendLanguage,
} from "./config/types";
//endregion

//region contentful
export {
    connectToContentfulManagementApi,
    connectToContentfulDeliveryApi,
    getExecutedMigrations,
    getDefaultLocale,
    findEntriesByIds,
    findOneEntry,
    findOneEntryBySys,
    findOneAsset,
} from "./contentful/api";

export {
    loadPageTree,
    getSlugPathsFromPageTree,
    loadPageData,
    loadPagePaths,
    findRootPage,
} from "./contentful/pages";

export type {
    PageTreeNode,
    OriginalPageData,
    ContentfulBasePage,
    ContentfulPage,
    ContentfulPageSeo,
    FindEntryByIdsOptions,
    FindEntryOptions,
    BaseContentfulEntry,
    RteData,
    ReferencesData,
} from "./contentful/types";

export {
    findPageBySlugInTree,
    findPageInTree,
    getLabeledLinkFromContentful,
    getAssetFromContentful,
    getContentfulSelectString,
    getContentfulWhereObject,
    getSlugPartsOfPageTreeNode,
    getPageSlug,
} from "./contentful/util";
//endregion

//region migrations
export type {
    ContentfulComponentMigration,
    ContentfulMigrationGenerator,
    ContentfulComponentMigrations,
} from "./migrations/types";

export { getPageMigration } from "./migrations/websites/page";
export { getReferenceMigration } from "./migrations/websites/reference";
export { getBlockTextImageMigration } from "./migrations/components/blockTextImage";
//endregion

//region data
export {
    getDataConfigForContentType,
    getContentTypeFromData,
    getContentTypeFromComponentKey,
    isComponentDataConfig,
    isArrayRelationType,
    isSingleRelationType,
    getComponentKeyFromData,
    getDataFieldNames,
} from "./data/util";

export { normalizeLabeledLink, normalizeReference } from "./data/reference";

export {
    normalizeData,
    normalizeDataForComponent,
    normalizeDataForDataConfig,
    normalizePageData,
} from "./data/normalizer";

export { addAssetToReferenceList, getRteData } from "./data/rte";

export { normalizeAssetData } from "./data/asset";

export { normalizeRelationTypeData, normalizeDynamicDataConfigData } from "./data/relation";

export type { ContentfulNormalizerService, InternalReferenceResolver } from "./data/service";

export { getContentfulNormalizerService } from "./data/service";

export { getPageConfig } from "./data/component/page";
//endregion
