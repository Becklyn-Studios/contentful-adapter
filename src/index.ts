//region config
export { getConfigFromFile } from "./config/config";

export type {
    ContentfulClientConfig,
    MaydContentfulAdapterConfig,
    MaydContentfulAdapterConfigFile,
    ComponentDataConfig,
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
    PageProps,
    ContentfulBasePage,
    ContentfulEntry,
    ContentfulPage,
    DetailedContentfulEntry,
    BaseContentfulEntry,
    ContentfulPageSeo,
    FindEntryByIdsOptions,
    FindEntryOptions,
    PageContent,
    PageProperties,
    SlotData,
    BlockData,
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
export {
    ContentfulComponentMigration,
    ContentfulMigrationGenerator,
    ContentfulComponentMigrations,
} from "./migrations/types";
//endregion
