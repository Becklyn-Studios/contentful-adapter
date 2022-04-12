import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE, RTE_TYPE_STYLED_FONT_AND_LIST } from "../rte";

const translations = {
    en: {
        blockList: {
            name: "🧩 Block > List",
            fields: {
                headline: "Headline",
                entries: "Entries",
            },
        },
        blockListEntry: {
            name: "🧩 Block > List > Entry",
            fields: {
                name: "Internal Name",
                title: "Title",
                text: "Text",
            },
        },
    },
    de: {
        blockList: {
            name: "🧩 Block > Liste",
            fields: {
                headline: "Überschrift",
                entries: "Entry",
            },
        },
        blockListEntry: {
            name: "🧩 Block > Liste > Eintrag",
            fields: {
                name: "Interner Name",
                title: "Titel",
                text: "Text",
            },
        },
    },
};

export const getBlockListMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockList",
        migrations: {
            1: migration => {
                const blockListEntry = migration.createContentType("blockListEntry", {
                    name: t.blockListEntry.name,
                });

                blockListEntry.createField("name", {
                    type: "Symbol",
                    name: t.blockListEntry.fields.name,
                    required: true,
                });

                blockListEntry.createField("title", {
                    type: "Symbol",
                    name: t.blockListEntry.fields.title,
                    required: true,
                });

                blockListEntry.createField("text", {
                    type: "RichText",
                    name: t.blockListEntry.fields.text,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT_AND_LIST),
                });

                blockListEntry.displayField("name");

                const blockList = migration.createContentType("blockList", {
                    name: t.blockList.name,
                });

                blockList.createField("headline", {
                    type: "Symbol",
                    name: t.blockList.fields.headline,
                });

                blockList.createField("entries", {
                    type: "Array",
                    name: t.blockList.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockListEntry"] }],
                    },
                    required: true,
                });

                migrateBaseBlockFields(blockList, language);
            },
            2: migration => {
                const blockList = migration.editContentType("blockList");

                blockList.deleteField("headline");

                blockList.createField("headline", {
                    type: "RichText",
                    name: t.blockList.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockList.moveField("headline").afterField("name");
            },
        },
    };
};
