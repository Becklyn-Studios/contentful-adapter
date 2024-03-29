//region config
export { getComponentDataConfig } from "./config/components";

export type {
    ContentfulClientConfig,
    ContentfulComponentConfig,
    ContentfulAdapterConfig,
    ContentfulAdapterConfigFile,
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
    findAllEntries,
    findOneEntry,
    findOneEntryBySys,
    findOneAsset,
} from "./contentful/api";

export { PageCache } from "./contentful/cache";

export { loadPageData, loadPagePaths } from "./contentful/pages";

export type {
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
    getLabeledLinkFromContentful,
    getAssetFromContentful,
    getContentfulSelectString,
    getContentfulWhereObject,
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
    RTE_TYPE_HEADLINE,
    RTE_TYPE_STYLED_FONT,
    RTE_TYPE_STYLED_FONT_AND_LIST,
    RTE_TYPE_MINIMAL,
    RTE_TYPE_FULL,
    RTE_TYPE_TABLE,
    RTE_TYPE_MARKS,
} from "./migrations/rte";

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
export { getBlockProcessMigration } from "./migrations/components/blockProcess";
export { getBlockListMigration } from "./migrations/components/blockList";
export { getCardMigration } from "./migrations/components/card";
//endregion

//region data
export {
    getDataConfigForContentType,
    getContentTypeFromData,
    getContentTypeFromComponentKey,
    isBaseComponentConfig,
    isArrayRelationType,
    isSingleRelationType,
    getComponentKeyFromData,
    getDataFieldNames,
    getValueOfField,
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
//endregion
