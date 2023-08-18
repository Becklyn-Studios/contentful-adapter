# 6.2.0

-   (feature) Add support for `Icon` RTE in `BlockTabSection`

# 6.1.0

-   (internal) Updated `@contentful/rich-text-types`
-   (feature) Added field for variant in `BlockSocialProof` and `BlockRatingsSlider`

# 6.0.0

-   (bc) Public release
-   (bc) Rename command to `becklyn-contentful`

# 5.9.2

-   (bug) Fix dependency tree for config loader.

# 5.9.1

-   (improvement) Make react a peer dependency.

# 5.9.0

-   (feature) Add parameter for page content type id.

# 5.8.1

-   (internal) Update all dependencies.

# 5.8.0

-   (feature) Add secondary labeled link to `blockTextImage`.
-   (feature) Add labeled link to `blockText`.

# 5.7.0

-   (feature) Allow archives for asset references.

# 5.6.0

-   (feature) Add second column to `blockList.ts`.

# 5.5.2

-   (improvement) Increase `blockThreeColumnsFeatures` entries size.

# 5.5.1

-   (bug) Do not throw errors when loading missing related data.

# 5.5.0

-   (feature) Add `blockLogos` monochrome version.

# 5.4.5

-   (improvement) Add `card` internal name.

# 5.4.4

-   (improvement) Make `card` text optional.

# 5.4.3

-   (improvement) Make `blockAccordion` headline optional.

# 5.4.2

-   (internal) Use leading `/` for slugs.

# 5.4.1

-   (bug) Add missing `version` field to `blockCardsTeaser`.

# 5.4.0

-   (feature) Add `rteMedia` and `rteQuote`.

# 5.3.1

-   (bug) Fix block anchor link auto generation in migrations.

# 5.3.0

-   (feature) Add `assetReference`.

# 5.2.1

-   (improvement) Turn `version` into radio field.

# 5.2.0

-   (improvement) Reduce `blockTabSections` tab sections.
-   (feature) Add `version` to `blockCardsSliderTeaser`.

# 5.1.0

-   (feature) Add `getTitleOfPageBySlug` to `PageCache`.
-   (feature) Add `getIdOfPageBySlug` to `PageCache`.
-   (feature) Add `isSlugExisting` to `PageCache`.

# 5.0.2

-   (bug) Remove beginning slash of all cached slugs.

# 5.0.1

-   (bug) Add missing page title to page cache.
-   (bug) Add beginning slash to all cached slugs.

# 5.0.0

-   (bc) Replace child pages by absolute slugs.

# 4.2.5

-   (improvement) Replace block tab sections display fields with `title`.
-   (improvement) Make page `slug` unique for better absolute slug support.

# 4.2.4

-   (bug) Add missing title field to block tab sections.

# 4.2.3

-   (improvement) Delete `blockTabSectionsEntry`.

# 4.2.2

-   (bug) Fix RTE normalizer.

# 4.2.1

-   (bug) Fix RTE normalizer.

# 4.2.0

-   (feature) Add `TYPE_RAW` normalizer.

# 4.1.3

-   (improvement) Remove `blockCardsTeaser` maximum validation.

# 4.1.2

-   (improvement) Add validation for page slugs and anchor links in migrations.

# 4.1.1

-   (bug) Fix internal reference anchor value.

# 4.1.0

-   (feature) Add anchor to internal reference.

# 4.0.7

-   (bug) Fix relation type normalization.

# 4.0.6

-   (bug) Fix relation type normalization.

# 4.0.5

-   (improvement) Bump `@becklyn/ui-types`.
-   (bug) Add version to `blockTabTextImage`.

# 4.0.4

-   (improvement) Remove required for field `rating` within `blockRatingsEntry`.
-   (improvement) Extend text input length for `blockRatingsEntry`.

# 4.0.3

-   (feature) Allow default hyperlinks for rte.

# 4.0.2

-   (bug) Properly remove ui components from `ContentfulComponentConfig`.

# 4.0.1

-   (bug) Properly remove ui components from `ContentfulComponentConfig`.

# 4.0.0

-   (bc) Use new version of `@becklyn/ui-types`.
-   (feature) Auto add child data configs to list of available data configs for normalization.

# 3.2.2

-   (bug) Load missing linked data in `normalizeDynamicDataConfigData`.

# 3.2.1

-   (bug) Fix return type of `normalizeAssetData`.

# 3.2.0

-   (feature) Allow direct normalization of links and assets.
-   (improvement) Add `id` field to normalized assets.

# 3.1.0

-   (feature) Export `getValueOfField` function.

# 3.0.0

-   (bc) Add locale to `ContentfulNormalizerService`. The locale needs to be passed in `getContentfulNormalizerService`.
-   (feature) Automatically normalize the data that depends on a locale.

# 2.8.1

-   (bug) Fix rte validation.

# 2.8.0

-   (feature) Add `parentData` to custom normalizer.
-   (feature) Add `findAllEntries` api function.
-   (bug) Fix full rte migrations.

# 2.7.8

-   (bug) Fix custom relation normalizer integration.

# 2.7.7

-   (bug) Enable custom normalizers for relations.

# 2.7.6

-   (improvement) Allow limit and skip for `findEntries`.

# 2.7.5

-   (improvement) Allow to use the preview api in `getContentfulNormalizerService`.

# 2.7.4

-   (improvement) Remove unused Component from internal component config object.

# 2.7.3

-   (bug) Load all migrations.
-   (bug) Fix headline migrations.
-   (improvement) Override default normalizer types.

# 2.7.2

-   (improvement) Use formatted headline in all blocks that use a headline.
-   (improvement) Improve headline type normalizer.
-   (bug) Fix headline rte migration.

# 2.7.1

-   (bug) Fix `blockThreeColumnsFeatures` migration.

# 2.7.0

-   (feature) Add image to seo.
-   (feature) Add formatted headline feature to normalizer.
-   (improvement) Use formatted headline in `blockThreeColumnsFeatures`.

# 2.6.3

-   (improvement) Optimize exports.

# 2.6.2

-   (improvement) Fix `title` in `PageTreeNode`.

# 2.6.1

-   (improvement) Add `title` to `PageTreeNode`.

# 2.6.0

-   (feature) Add `blockProcess` migration.
-   (feature) Add `blockList` migration.

# 2.5.2

-   (internal) Improve migration error handling.

# 2.5.1

-   (bug) Fix `loadPageTree`
-   (bug) Fix `getSlugPartsOfPageTreeNode`.

# 2.5.0

-   (feature) Automatically add `anchor` and `anchorLabel` to all types in normalizer.

# 2.4.0

-   (feature) Automatically add `id` to all types in normalizer.

# 2.3.1

-   (bug) Fix `findEntries` limit.

# 2.3.0

-   (feature) Add `blockIconCards` migration.

# 2.2.0

-   (feature) Add `findEntries` api function.

# 2.1.0

-   (feature) Allow registration of custom `DataTypeNormalizer`s.

# 2.0.3

-   (improvement) Use default values for boolean fields in migrations.

# 2.0.2

-   (improvement) Improve migrations

# 2.0.1

-   (improvement) Add icons to content type names.
-   (internal) Update prettier code style.

# 2.0.0

-   (bc) Unify `blockLogosSlider` and `blockLogos` to one content type (`blockLogos`).
-   (feature) Export `getRteValidation` and `RTE_TYPE_*` constants.
-   (feature) Export `migrateBaseBlockFields`.

# 1.0.0

-   (bug) Fix page tree slug generation.
-   (bc) Reorder parameters of `getContentfulNormalizerService`.

# 0.0.21

-   (feature) Auto normalize `theme` and `version` fields.

# 0.0.20

-   (bug) Fix migrations.

# 0.0.19

-   (bug) Fix `blockTabSections` migration.

# 0.0.18

-   (improvement) Export all migrations.

# 0.0.17

-   (feature) Add `blockLogos` migration.
-   (feature) Add `blockSocialProof` migration.
-   (feature) Add `blockAccordion` migration.
-   (feature) Add `blockCardsTeaser` migration.
-   (feature) Add `blockCardsSliderTeaser` migration.
-   (feature) Add `blockLogosSlider` migration.
-   (feature) Add `blockRatings` migration.
-   (feature) Add `blockRatingsSlider` migration.
-   (feature) Add `blockSocialProof` migration.
-   (feature) Add `blockTabSections` migration.
-   (feature) Add `blockText` migration.
-   (feature) Add `blockThreeColumnsFeatures` migration.

# 0.0.16

-   (bug) Fix `blockFeatures` migration.

# 0.0.15

-   (bug) Fix `blockFeatures` migration.

# 0.0.14

-   (bug) Fix `internalReference` migration.

# 0.0.13

-   (feature) Add `blockFeatures` migration.

# 0.0.12

-   (bug) Fix `RteData` type.

# 0.0.11

-   (bug) Fix exports.

# 0.0.10

-   (bug) Fix rte normalizer.

# 0.0.9

-   (improvement) Bump `@becklyn/ui-types`.

# 0.0.8

-   (feature) Export `getComponentDataConfig` function.

# 0.0.7

-   (bug) Fix translations for `internalReference` migration.

# 0.0.6

-   (improvement) Cleanup `becklyn-contentful.config.ts` setup file.
-   (improvement) Improve root exports.
-   (bug) Fix page slug normalizer.
-   (feature) Add automatic `componentKey` field to normalized data.
-   (feature) Configure `internalReference` path resolvers.

# 0.0.5

-   (bug) Fix block text image migration.

# 0.0.4

-   (feature) Add automatic data normalizer
-   (bug) Fix `loadPageData` fetching depth.
-   (improvement) Allow direct use `BaseComponentConfig` as `component` in configuration.

# 0.0.3

-   (bug) Fix `setup` command.
-   (bug) Fix page api functions.
-   (bug) Fix type declarations.
-   (feature) Add `blockTextImage` migration.

# 0.0.2

-   (bug) Add root exports.

# 0.0.1

-   (feature) Add data fetching functions.
-   (feature) Add specialized data fetching functions for pages.
