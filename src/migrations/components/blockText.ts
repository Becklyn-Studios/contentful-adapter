import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE, RTE_TYPE_STYLED_FONT_AND_LIST } from "../rte";

const translations = {
    en: {
        blockText: {
            name: "🧩 Block > Text",
            fields: {
                overline: "Overline",
                headline: "Headline",
                text: "Text",
                labeledLink: "Button",
            },
        },
    },
    de: {
        blockText: {
            name: "🧩 Block > Text",
            fields: {
                overline: "Overline",
                headline: "Überschrift",
                text: "Text",
                labeledLink: "Button",
            },
        },
    },
};

export const getBlockTextMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockText",
        migrations: {
            1: migration => {
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
            },
            2: migration => {
                const blockText = migration.editContentType("blockText");

                blockText.deleteField("headline");

                blockText.createField("headline", {
                    type: "RichText",
                    name: t.blockText.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockText.moveField("headline").afterField("name");
            },
            3: migration => {
                const blockText = migration.editContentType("blockText");

                blockText.editField("headline").required(true);
                blockText.moveField("headline").afterField("overline");
            },
            4: migration => {
                const blockText = migration.editContentType("blockText");

                blockText.createField("labeledLink", {
                    type: "Link",
                    name: t.blockText.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                blockText.moveField("labeledLink").afterField("text");
            },
        },
    };
};
