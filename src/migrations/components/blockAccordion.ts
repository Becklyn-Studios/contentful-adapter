import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE, RTE_TYPE_STYLED_FONT_AND_LIST } from "../rte";
import migration from "../migration";

const translations = {
    en: {
        blockAccordion: {
            name: "🧩 Block > Accordion",
            fields: {
                headline: "Headline",
                labeledLink: "Button",
                entries: "Entries",
            },
        },
        blockAccordionEntry: {
            name: "🧩 Block > Accordion > Entry",
            fields: {
                name: "Internal Name",
                headline: "Headline",
                text: "Text",
            },
        },
    },
    de: {
        blockAccordion: {
            name: "🧩 Block > Akkordeon",
            fields: {
                headline: "Überschrift",
                labeledLink: "Button",
                entries: "Einträge",
            },
        },
        blockAccordionEntry: {
            name: "🧩 Block > Akkordeon > Eintrag",
            fields: {
                name: "Interner Name",
                headline: "Überschrift",
                text: "Text",
            },
        },
    },
};

export const getBlockAccordionMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockAccordion",
        migrations: {
            1: migration => {
                const blockAccordionEntry = migration.createContentType("blockAccordionEntry", {
                    name: t.blockAccordionEntry.name,
                });

                blockAccordionEntry.createField("name", {
                    type: "Symbol",
                    name: t.blockAccordionEntry.fields.name,
                    required: true,
                });

                blockAccordionEntry.createField("headline", {
                    type: "Symbol",
                    name: t.blockAccordionEntry.fields.headline,
                    required: true,
                });

                blockAccordionEntry.createField("text", {
                    type: "RichText",
                    name: t.blockAccordionEntry.fields.text,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT_AND_LIST),
                });

                blockAccordionEntry.displayField("name");

                const blockAccordion = migration.createContentType("blockAccordion", {
                    name: t.blockAccordion.name,
                });

                blockAccordion.createField("headline", {
                    type: "Symbol",
                    name: t.blockAccordion.fields.headline,
                    required: true,
                });

                blockAccordion.createField("entries", {
                    type: "Array",
                    name: t.blockAccordion.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockAccordionEntry"] }],
                    },
                    required: true,
                });

                migrateBaseBlockFields(blockAccordion, language);
            },
            2: migration => {
                const blockAccordion = migration.editContentType("blockAccordion");

                blockAccordion.deleteField("headline");

                blockAccordion.createField("headline", {
                    type: "RichText",
                    name: t.blockAccordion.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockAccordion.moveField("headline").afterField("name");
            },
            3: migration => {
                const blockAccordion = migration.editContentType("blockAccordion");

                blockAccordion.editField("headline").required(true);
            },
            4: migration => {
                const blockAccordion = migration.editContentType("blockAccordion");

                blockAccordion.editField("headline").required(false);
            },
        },
    };
};
