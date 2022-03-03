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
    findEntries,
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

export {
    getRteValidation,
    RTE_TYPE_STYLED_FONT,
    RTE_TYPE_STYLED_FONT_AND_LIST,
    RTE_TYPE_MINIMAL,
    RTE_TYPE_FULL,
} from "./migrations/components/rte";

export { migrateBaseBlockFields } from "./migrations/components/block";
export { getPageMigration } from "./migrations/websites/page";
export { getReferenceMigration } from "./migrations/websites/reference";
export { getBlockAccordionMigration } from "./migrations/components/blockAccordion";
export { getBlockCardsTeaserMigration } from "./migrations/components/blockCardsTeaser";
export { getBlockCardsSliderTeaserMigration } from "./migrations/components/blockCardsSliderTeaser";
export { getBlockFeaturesMigration } from "./migrations/components/blockFeatures";
export { getBlockLogosMigration } from "./migrations/components/blockLogos";
export { getBlockRatingsMigration } from "./migrations/components/blockRatings";
export { getBlockRatingsSliderMigration } from "./migrations/components/blockRatingsSlider";
export { getBlockSocialProofMigration } from "./migrations/components/blockSocialProof";
export { getBlockTabSectionsMigration } from "./migrations/components/blockTabSections";
export { getBlockTextMigration } from "./migrations/components/blockText";
export { getBlockTextImageMigration } from "./migrations/components/blockTextImage";
export { getBlockThreeColumnsFeaturesMigration } from "./migrations/components/blockThreeColumnsFeatures";
export { getBlockIconCardsMigration } from "./migrations/components/blockIconCards";
export { getCardMigration } from "./migrations/components/card";
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
