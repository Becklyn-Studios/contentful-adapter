//region config
export { getConfigFromFile } from "./config/config";

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

export { getPageMigration } from "./migrations/websites/page";

export { getReferenceMigration } from "./migrations/websites/reference";
//endregion
