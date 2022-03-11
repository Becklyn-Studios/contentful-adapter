import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { INLINES } from "@contentful/rich-text-types";
import { getRteValidation, RTE_TYPE_HEADLINE } from "./rte";

const translations = {
    en: {
        blockCardsTeaser: {
            name: "🧩 Block > Cards Teaser",
            fields: {
                overline: "Overline",
                headline: "Headline",
                text: "Text",
                labeledLink: "Button",
                entries: "Entries",
            },
        },
    },
    de: {
        blockCardsTeaser: {
            name: "🧩 Block > Cards Teaser",
            fields: {
                overline: "Overline",
                headline: "Überschrift",
                text: "Text",
                labeledLink: "Button",
                entries: "Einträge",
            },
        },
    },
};

export const getBlockCardsTeaserMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockCardsTeaser",
        migrations: {
            1: migration => {
                const blockCardsTeaser = migration.createContentType("blockCardsTeaser", {
                    name: t.blockCardsTeaser.name,
                });

                blockCardsTeaser.createField("overline", {
                    type: "Symbol",
                    name: t.blockCardsTeaser.fields.overline,
                });

                blockCardsTeaser.createField("headline", {
                    type: "Symbol",
                    name: t.blockCardsTeaser.fields.headline,
                    required: true,
                });

                blockCardsTeaser.createField("text", {
                    type: "RichText",
                    name: t.blockCardsTeaser.fields.text,
                    validations: getRteValidation(),
                });

                blockCardsTeaser.createField("entries", {
                    type: "Array",
                    name: t.blockCardsTeaser.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["card"] }],
                    },
                    required: true,
                    validations: [{ size: { min: 2, max: 3 } }],
                });

                blockCardsTeaser.createField("labeledLink", {
                    type: "Link",
                    name: t.blockCardsTeaser.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                migrateBaseBlockFields(blockCardsTeaser, language);
            },
            2: migration => {
                const blockCardsTeaser = migration.editContentType("blockCardsTeaser");

                blockCardsTeaser.deleteField("headline");

                blockCardsTeaser.createField("headline", {
                    type: "RichText",
                    name: t.blockCardsTeaser.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockCardsTeaser.moveField("headline").afterField("name");
            },
        },
    };
};
