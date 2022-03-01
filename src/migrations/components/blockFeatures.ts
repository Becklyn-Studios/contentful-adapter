import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation } from "./rte";

const translations = {
    en: {
        blockFeatures: {
            name: "🧩 Block > Features",
            fields: {
                overline: "Overline",
                headline: "Headline",
                image: "Image",
                entries: "Entries",
            },
        },
        blockFeaturesEntry: {
            name: "🧩 Block > Features > Entry",
            fields: {
                icon: "Icon",
                headline: "Headline",
                text: "Text",
            },
        },
    },
    de: {
        blockFeatures: {
            name: "🧩 Block > Features",
            fields: {
                overline: "Overline",
                headline: "Überschrift",
                image: "Bild",
                entries: "Einträge",
            },
        },
        blockFeaturesEntry: {
            name: "🧩 Block > Features > Eintrag",
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
                });

                blockFeaturesEntry.createField("text", {
                    type: "RichText",
                    name: t.blockFeaturesEntry.fields.text,
                    validations: getRteValidation(),
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
                    type: "Array",
                    name: t.blockFeatures.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockFeaturesEntry"] }],
                    },
                    required: true,
                    validations: [{ size: { max: 4 } }],
                });

                migrateBaseBlockFields(blockFeatures, language);

                blockFeatures.displayField("headline");
            },
        },
    };
};
