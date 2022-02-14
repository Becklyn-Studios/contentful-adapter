import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { INLINES } from "@contentful/rich-text-types";

export const THEME_BLOCK_FEATURES = {
    en: {
        background: "With background",
        noBackground: "Without background",
    },
    de: {
        background: "Mit Hintergrund",
        noBackground: "Kein Hintergrund",
    },
};

const translations = {
    en: {
        blockFeatures: {
            name: "Block > Text Image",
            fields: {
                overline: "Overline",
                headline: "Headline",
                anchor: "Anchor",
                anchorLabel: "Anchor Label",
                image: "Image",
                entries: "Entries",
                theme: {
                    name: "Theme",
                    default: THEME_BLOCK_FEATURES.en.noBackground,
                    in: [THEME_BLOCK_FEATURES.en.noBackground, THEME_BLOCK_FEATURES.en.background],
                },
            },
        },
        blockFeaturesEntry: {
            name: "Block > Text Image > Entry",
            fields: {
                icon: "Icon",
                headline: "Headline",
                text: "Text",
            },
        },
    },
    de: {
        blockFeatures: {
            name: "Block > Text Bild",
            fields: {
                overline: "Overline",
                headline: "Überschrift",
                anchor: "Anker",
                anchorLabel: "Anker Label",
                image: "Bild",
                entries: "Einträge",
                theme: {
                    name: "Theme",
                    default: THEME_BLOCK_FEATURES.de.noBackground,
                    in: [THEME_BLOCK_FEATURES.de.noBackground, THEME_BLOCK_FEATURES.de.background],
                },
            },
        },
        blockFeaturesEntry: {
            name: "Block > Text Bild > Eintrag",
            fields: {
                icon: "Icon",
                headline: "Überschrift",
                text: "Text",
            },
        },
    },
};

export const getBlockFeaturesMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    return {
        component: "blockFeatures",
        migrations: {
            1: migration => {
                const t = translations[language];

                const blockFeaturesEntry = migration.createContentType("blockFeaturesEntry", {
                    name: t.blockFeaturesEntry.name,
                });

                blockFeaturesEntry.createField("headline", {
                    type: "Symbol",
                    name: t.blockFeaturesEntry.fields.headline,
                    required: true,
                });

                blockFeaturesEntry.createField("icon", {
                    type: "Link",
                    name: t.blockFeaturesEntry.fields.icon,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                    required: true,
                });

                blockFeaturesEntry.createField("text", {
                    type: "RichText",
                    name: t.blockFeaturesEntry.fields.text,
                    validations: [
                        { enabledMarks: [] },
                        {
                            enabledNodeTypes: [INLINES.ENTRY_HYPERLINK, INLINES.ASSET_HYPERLINK],
                        },
                        {
                            nodes: {
                                [INLINES.ENTRY_HYPERLINK]: [
                                    {
                                        linkContentType: ["internalReference", "externalReference"],
                                    },
                                ],
                            },
                        },
                    ],
                });

                blockFeaturesEntry.displayField("headline");

                const blockFeatures = migration.createContentType("blockFeatures", {
                    name: t.blockFeatures.name,
                });

                blockFeatures.createField("overline", {
                    type: "Symbol",
                    name: t.blockFeatures.fields.overline,
                });

                blockFeatures.createField("headline", {
                    type: "Symbol",
                    name: t.blockFeatures.fields.headline,
                    required: true,
                });

                blockFeatures.createField("image", {
                    type: "Link",
                    name: t.blockFeatures.fields.image,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                });

                blockFeatures.createField("entries", {
                    type: "Link",
                    name: t.blockFeatures.fields.entries,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["blockFeaturesEntry"] }],
                    required: true,
                });

                blockFeatures.createField("theme", {
                    type: "Symbol",
                    name: t.blockFeatures.fields.theme.name,
                    required: true,
                    defaultValue: {
                        [language]: t.blockFeatures.fields.theme.default,
                    },
                    validations: [
                        {
                            in: t.blockFeatures.fields.theme.in,
                        },
                    ],
                });

                blockFeatures.changeFieldControl("theme", "builtin", "radio");

                blockFeatures.createField("anchor", {
                    type: "Symbol",
                    name: t.blockFeatures.fields.anchor,
                    required: true,
                });

                blockFeatures.changeFieldControl("anchor", "builtin", "slugEditor", {
                    trackingFieldId: "headline",
                });

                blockFeatures.createField("anchorLabel", {
                    type: "Symbol",
                    name: t.blockFeatures.fields.anchorLabel,
                    validations: [
                        {
                            size: {
                                max: 25,
                            },
                        },
                    ],
                });

                blockFeatures.displayField("headline");
            },
        },
    };
};
