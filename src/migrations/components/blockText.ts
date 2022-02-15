import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_STYLED_FONT_AND_LIST } from "./rte";

const translations = {
    en: {
        blockText: {
            name: "Block > Text",
            fields: {
                overline: "Overline",
                headline: "Headline",
                text: "Text",
            },
        },
    },
    de: {
        blockText: {
            name: "Block > Text",
            fields: {
                overline: "Overline",
                headline: "Überschrift",
                text: "Text",
            },
        },
    },
};

export const getBlockTextMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    return {
        component: "blockText",
        migrations: {
            1: migration => {
                const t = translations[language];

                const blockText = migration.createContentType("blockText", {
                    name: t.blockText.name,
                });

                blockText.createField("overline", {
                    type: "Symbol",
                    name: t.blockText.fields.overline,
                });

                blockText.createField("headline", {
                    type: "Symbol",
                    name: t.blockText.fields.headline,
                    required: true,
                });

                blockText.createField("text", {
                    type: "RichText",
                    name: t.blockText.fields.text,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT_AND_LIST),
                });

                migrateBaseBlockFields(blockText, language);

                blockText.displayField("headline");
            },
        },
    };
};