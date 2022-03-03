import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation } from "./rte";

const translations = {
    en: {
        blockIconCards: {
            name: "🧩 Block > Icon Cards",
            fields: {
                overline: "Overline",
                headline: "Headline",
                entries: "Entries",
            },
        },
        blockIconCardsEntry: {
            name: "🧩 Block > Icon Cards > Card",
            fields: {
                name: "Internal Name",
                title: "Title",
                icon: "Icon",
                labeledLink: "Link",
            },
        },
    },
    de: {
        blockIconCards: {
            name: "🧩 Block > Icon Cards",
            fields: {
                overline: "Overline",
                headline: "Überschrift",
                entries: "Einträge",
            },
        },
        blockIconCardsEntry: {
            name: "🧩 Block > Icon Cards > Card",
            fields: {
                name: "Interner Name",
                title: "Titel",
                icon: "Icon",
                labeledLink: "Link",
            },
        },
    },
};

export const getBlockIconCardsMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockIconCards",
        migrations: {
            1: migration => {
                const blockIconCardsEntry = migration.createContentType("blockIconCardsEntry", {
                    name: t.blockIconCardsEntry.name,
                });

                blockIconCardsEntry.createField("name", {
                    type: "Symbol",
                    name: t.blockIconCardsEntry.fields.name,
                    required: true,
                });

                blockIconCardsEntry.createField("title", {
                    type: "Symbol",
                    name: t.blockIconCardsEntry.fields.title,
                    required: true,
                });

                blockIconCardsEntry.createField("icon", {
                    type: "Link",
                    name: t.blockIconCardsEntry.fields.icon,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                    required: true,
                });

                blockIconCardsEntry.createField("labeledLink", {
                    type: "Link",
                    name: t.blockIconCardsEntry.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                    required: true,
                });

                blockIconCardsEntry.displayField("name");

                const blockIconCards = migration.createContentType("blockIconCards", {
                    name: t.blockIconCards.name,
                });

                blockIconCards.createField("overline", {
                    type: "Symbol",
                    name: t.blockIconCards.fields.overline,
                });

                blockIconCards.createField("headline", {
                    type: "Symbol",
                    name: t.blockIconCards.fields.headline,
                });

                blockIconCards.createField("entries", {
                    type: "Array",
                    name: t.blockIconCards.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockIconCardsEntry"] }],
                    },
                    required: true,
                });

                migrateBaseBlockFields(blockIconCards, language);
            },
        },
    };
};
