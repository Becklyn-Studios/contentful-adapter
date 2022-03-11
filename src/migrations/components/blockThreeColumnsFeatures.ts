import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE } from "./rte";
import migration from "../migration";

const translations = {
    en: {
        blockThreeColumnsFeatures: {
            name: "🧩 Block > Features Three Columns",
            fields: {
                headline: "Headline",
                labeledLink: "Button",
                entries: "Entries",
            },
        },
        blockThreeColumnsFeaturesEntry: {
            name: "🧩 Block > Features Three Columns > Entry",
            fields: {
                name: "Internal Name",
                icon: "Icon",
                headline: "Headline",
                text: "Text",
            },
        },
    },
    de: {
        blockThreeColumnsFeatures: {
            name: "🧩 Block > Features Drei Spalten",
            fields: {
                headline: "Überschrift",
                labeledLink: "Button",
                entries: "Einträge",
            },
        },
        blockThreeColumnsFeaturesEntry: {
            name: "🧩 Block > Features Drei Spalten > Eintrag",
            fields: {
                name: "Interner Name",
                icon: "Icon",
                headline: "Überschrift",
                text: "Text",
            },
        },
    },
};

export const getBlockThreeColumnsFeaturesMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockThreeColumnsFeatures",
        migrations: {
            1: migration => {
                const blockThreeColumnsFeaturesEntry = migration.createContentType(
                    "blockThreeColumnsFeaturesEntry",
                    {
                        name: t.blockThreeColumnsFeaturesEntry.name,
                    }
                );

                blockThreeColumnsFeaturesEntry.createField("name", {
                    type: "Symbol",
                    name: t.blockThreeColumnsFeaturesEntry.fields.name,
                    required: true,
                });

                blockThreeColumnsFeaturesEntry.createField("headline", {
                    type: "Symbol",
                    name: t.blockThreeColumnsFeaturesEntry.fields.headline,
                    required: true,
                });

                blockThreeColumnsFeaturesEntry.createField("icon", {
                    type: "Link",
                    name: t.blockThreeColumnsFeaturesEntry.fields.icon,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                });

                blockThreeColumnsFeaturesEntry.createField("text", {
                    type: "RichText",
                    name: t.blockThreeColumnsFeaturesEntry.fields.text,
                    validations: getRteValidation(),
                });

                blockThreeColumnsFeaturesEntry.displayField("name");

                const blockThreeColumnsFeatures = migration.createContentType(
                    "blockThreeColumnsFeatures",
                    {
                        name: t.blockThreeColumnsFeatures.name,
                    }
                );

                blockThreeColumnsFeatures.createField("headline", {
                    type: "Symbol",
                    name: t.blockThreeColumnsFeatures.fields.headline,
                });

                blockThreeColumnsFeatures.createField("labeledLink", {
                    type: "Link",
                    name: t.blockThreeColumnsFeatures.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                blockThreeColumnsFeatures.createField("entries", {
                    type: "Array",
                    name: t.blockThreeColumnsFeatures.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockThreeColumnsFeaturesEntry"] }],
                    },
                    required: true,
                    validations: [{ size: { max: 3 } }],
                });

                migrateBaseBlockFields(blockThreeColumnsFeatures, language);
            },
            2: migration => {
                const blockThreeColumnsFeatures = migration.editContentType(
                    "blockThreeColumnsFeatures"
                );

                blockThreeColumnsFeatures.editField("headline", {
                    type: "RichText",
                    name: t.blockThreeColumnsFeatures.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockThreeColumnsFeatures.editField("entries").validations([{ size: { max: 9 } }]);
            },
        },
    };
};
