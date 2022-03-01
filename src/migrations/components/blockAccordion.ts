import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_STYLED_FONT_AND_LIST } from "./rte";

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
                headline: "Überschrift",
                text: "Text",
            },
        },
    },
};

export const getBlockAccordionMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    return {
        component: "blockAccordion",
        migrations: {
            1: migration => {
                const t = translations[language];

                const blockAccordionEntry = migration.createContentType("blockAccordionEntry", {
                    name: t.blockAccordionEntry.name,
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

                blockAccordionEntry.displayField("headline");

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

                blockAccordion.displayField("headline");
            },
        },
    };
};
