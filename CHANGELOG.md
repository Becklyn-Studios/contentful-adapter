2.6.3
=====

*   (improvement) Optimize exports.


2.6.2
=====

*   (improvement) Fix `title` in `PageTreeNode`.


2.6.1
=====

*   (improvement) Add `title` to `PageTreeNode`.


2.6.0
=====

*   (feature) Add `blockProcess` migration.
*   (feature) Add `blockList` migration.


2.5.2
=====

*   (internal) Improve migration error handling.


2.5.1
=====

*   (bug) Fix `loadPageTree` 
*   (bug) Fix `getSlugPartsOfPageTreeNode`.


2.5.0
=====

*   (feature) Automatically add `anchor` and `anchorLabel` to all types in normalizer.


2.4.0
=====

*   (feature) Automatically add `id` to all types in normalizer.


2.3.1
=====

*   (bug) Fix `findEntries` limit.


2.3.0
=====

*   (feature) Add `blockIconCards` migration.


2.2.0
=====

*   (feature) Add `findEntries` api function.


2.1.0
=====

*   (feature) Allow registration of custom `DataTypeNormalizer`s.


2.0.3
=====

*   (improvement) Use default values for boolean fields in migrations.


2.0.2
=====

*   (improvement) Improve migrations


2.0.1
=====

*   (improvement) Add icons to content type names.
*   (internal) Update prettier code style.


2.0.0
=====

*   (bc) Unify `blockLogosSlider` and `blockLogos` to one content type (`blockLogos`).
*   (feature) Export `getRteValidation` and `RTE_TYPE_*` constants.
*   (feature) Export `migrateBaseBlockFields`.


1.0.0
=====

*   (bug) Fix page tree slug generation.
*   (bc) Reorder parameters of `getContentfulNormalizerService`.


0.0.21
======

*   (feature) Auto normalize `theme` and `version` fields.


0.0.20
======

*   (bug) Fix migrations.


0.0.19
======

*   (bug) Fix `blockTabSections` migration.


0.0.18
======

*   (improvement) Export all migrations.


0.0.17
======

*   (feature) Add `blockLogos` migration.
*   (feature) Add `blockSocialProof` migration.
*   (feature) Add `blockAccordion` migration.
*   (feature) Add `blockCardsTeaser` migration.
*   (feature) Add `blockCardsSliderTeaser` migration.
*   (feature) Add `blockLogosSlider` migration.
*   (feature) Add `blockRatings` migration.
*   (feature) Add `blockRatingsSlider` migration.
*   (feature) Add `blockSocialProof` migration.
*   (feature) Add `blockTabSections` migration.
*   (feature) Add `blockText` migration.
*   (feature) Add `blockThreeColumnsFeatures` migration.


0.0.16
======

*   (bug) Fix `blockFeatures` migration.


0.0.15
======

*   (bug) Fix `blockFeatures` migration.


0.0.14
======

*   (bug) Fix `internalReference` migration.


0.0.13
======

*   (feature) Add `blockFeatures` migration.


0.0.12
======

*   (bug) Fix `RteData` type.


0.0.11
======

*   (bug) Fix exports.


0.0.10
======

*   (bug) Fix rte normalizer.


0.0.9
=====

*   (improvement) Bump `@mayd/ui-types`.


0.0.8
=====

*   (feature) Export `getComponentDataConfig` function.


0.0.7
=====

*   (bug) Fix translations for `internalReference` migration.


0.0.6
=====

*   (improvement) Cleanup `mayd-contentful.config.ts` setup file.
*   (improvement) Improve root exports.
*   (bug) Fix page slug normalizer.
*   (feature) Add automatic `componentKey` field to normalized data.
*   (feature) Configure `internalReference` path resolvers.


0.0.5
=====

*   (bug) Fix block text image migration.


0.0.4
=====

*   (feature) Add automatic data normalizer
*   (bug) Fix `loadPageData` fetching depth.
*   (improvement) Allow direct use `BaseComponentConfig` as `component` in configuration.


0.0.3
=====

*   (bug) Fix `setup` command.
*   (bug) Fix page api functions.
*   (bug) Fix type declarations.
*   (feature) Add `blockTextImage` migration.


0.0.2
=====

*   (bug) Add root exports.


0.0.1
=====

*   (feature) Add data fetching functions.
*   (feature) Add specialized data fetching functions for pages.
