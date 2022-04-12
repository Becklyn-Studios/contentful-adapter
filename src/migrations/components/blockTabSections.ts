import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE, RTE_TYPE_STYLED_FONT_AND_LIST } from "../rte";

export const VERSION_BLOCK_TAB_SECTION_TEXT_IMAGE = {
    en: {
        imageLeft: "Image left",
        imageRight: "Image right",
    },
    de: {
        imageLeft: "Bild links",
        imageRight: "Bild rechts",
    },
};

const translations = {
    en: {
        blockTabSections: {
            name: "🧩 Block > Tabs",
            fields: {
                headline: "Headline",
                entries: "Tabs",
            },
        },
        blockTabSectionsEntry: {
            name: "🧩 Block > Tabs > Tab",
            fields: {
                name: "Internal Name",
                title: "Title",
                content: "Content",
            },
        },
        blockTabSectionText: {
            name: "🧩 Block > Tabs > Text Section",
            fields: {
                name: "Internal Name",
                title: "Title",
                headline: "Headline",
                text: "Text",
            },
        },
        blockTabSectionTextColumns: {
            name: "🧩 Block > Tabs > Text Cloumns Section",
            fields: {
                name: "Internal Name",
                title: "Title",
                headline: "Headline",
                firstColumn: "Text Left",
                secondColumn: "Text Right",
            },
        },
        blockTabSectionTextImage: {
            name: "🧩 Block > Tabs > Text Image Section",
            fields: {
                name: "Internal Name",
                title: "Title",
                headline: "Headline",
                text: "Text",
                image: "Image",
                labeledLink: "Button",
                version: {
                    name: "Version",
                    default: VERSION_BLOCK_TAB_SECTION_TEXT_IMAGE.en.imageRight,
                    in: [
                        VERSION_BLOCK_TAB_SECTION_TEXT_IMAGE.en.imageLeft,
                        VERSION_BLOCK_TAB_SECTION_TEXT_IMAGE.en.imageRight,
                    ],
                },
            },
        },
        blockTabSectionVideo: {
            name: "🧩 Block > Tabs > Video Section",
            fields: {
                name: "Internal Name",
                title: "Title",
                video: "Video",
            },
        },
    },
    de: {
        blockTabSections: {
            name: "🧩 Block > Tabs",
            fields: {
                headline: "Überschrift",
                entries: "Tabs",
            },
        },
        blockTabSectionsEntry: {
            name: "🧩 Block > Tabs > Tab",
            fields: {
                name: "Interner Name",
                title: "Titel",
                content: "Inhalt",
            },
        },
        blockTabSectionText: {
            name: "🧩 Block > Tabs > Text Sektion",
            fields: {
                name: "Interner Name",
                title: "Titel",
                headline: "Überschrift",
                text: "Text",
            },
        },
        blockTabSectionTextColumns: {
            name: "🧩 Block > Tabs > Text Spalten Sektion",
            fields: {
                name: "Interner Name",
                title: "Titel",
                headline: "Überschrift",
                firstColumn: "Text Links",
                secondColumn: "Text Rechts",
            },
        },
        blockTabSectionTextImage: {
            name: "🧩 Block > Tabs > Text Bild Sektion",
            fields: {
                name: "Interner Name",
                title: "Titel",
                headline: "Überschrift",
                text: "Text",
                image: "Bild",
                labeledLink: "Button",
                version: {
                    name: "Version",
                    default: VERSION_BLOCK_TAB_SECTION_TEXT_IMAGE.de.imageRight,
                    in: [
                        VERSION_BLOCK_TAB_SECTION_TEXT_IMAGE.de.imageLeft,
                        VERSION_BLOCK_TAB_SECTION_TEXT_IMAGE.de.imageRight,
                    ],
                },
            },
        },
        blockTabSectionVideo: {
            name: "🧩 Block > Tabs > Video Sektion",
            fields: {
                name: "Interner Name",
                title: "Titel",
                video: "Video",
            },
        },
    },
};

export const getBlockTabSectionsMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockTabSections",
        migrations: {
            1: migration => {
                const blockTabSectionText = migration.createContentType("blockTabSectionText", {
                    name: t.blockTabSectionText.name,
                });

                blockTabSectionText.createField("name", {
                    type: "Symbol",
                    name: t.blockTabSectionText.fields.name,
                    required: true,
                });

                blockTabSectionText.createField("headline", {
                    type: "Symbol",
                    name: t.blockTabSectionText.fields.headline,
                });

                blockTabSectionText.createField("text", {
                    type: "RichText",
                    name: t.blockTabSectionText.fields.text,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT_AND_LIST),
                });

                blockTabSectionText.displayField("name");
            },
            2: migration => {
                const blockTabSectionTextColumns = migration.createContentType(
                    "blockTabSectionTextColumns",
                    {
                        name: t.blockTabSectionTextColumns.name,
                    }
                );

                blockTabSectionTextColumns.createField("name", {
                    type: "Symbol",
                    name: t.blockTabSectionTextColumns.fields.name,
                    required: true,
                });

                blockTabSectionTextColumns.createField("headline", {
                    type: "Symbol",
                    name: t.blockTabSectionTextColumns.fields.headline,
                });

                blockTabSectionTextColumns.createField("firstColumn", {
                    type: "RichText",
                    name: t.blockTabSectionTextColumns.fields.firstColumn,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT_AND_LIST),
                });

                blockTabSectionTextColumns.createField("secondColumn", {
                    type: "RichText",
                    name: t.blockTabSectionTextColumns.fields.secondColumn,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT_AND_LIST),
                });

                blockTabSectionTextColumns.displayField("name");
            },
            3: migration => {
                const blockTabSectionTextImage = migration.createContentType(
                    "blockTabSectionTextImage",
                    {
                        name: t.blockTabSectionTextImage.name,
                    }
                );

                blockTabSectionTextImage.createField("name", {
                    type: "Symbol",
                    name: t.blockTabSectionTextImage.fields.name,
                    required: true,
                });

                blockTabSectionTextImage.createField("headline", {
                    type: "Symbol",
                    name: t.blockTabSectionTextImage.fields.headline,
                });

                blockTabSectionTextImage.createField("text", {
                    type: "RichText",
                    name: t.blockTabSectionTextImage.fields.text,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT_AND_LIST),
                });

                blockTabSectionTextImage.createField("image", {
                    type: "Link",
                    name: t.blockTabSectionTextImage.fields.image,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                    required: true,
                });

                blockTabSectionTextImage.displayField("name");
            },
            4: migration => {
                const blockTabSectionVideo = migration.createContentType("blockTabSectionVideo", {
                    name: t.blockTabSectionVideo.name,
                });

                blockTabSectionVideo.createField("name", {
                    type: "Symbol",
                    name: t.blockTabSectionVideo.fields.name,
                    required: true,
                });

                blockTabSectionVideo.createField("video", {
                    type: "Link",
                    name: t.blockTabSectionVideo.fields.video,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["video"] }],
                    required: true,
                });

                blockTabSectionVideo.displayField("name");
            },
            5: migration => {
                const blockTabSectionsEntry = migration.createContentType("blockTabSectionsEntry", {
                    name: t.blockTabSectionsEntry.name,
                });

                blockTabSectionsEntry.createField("name", {
                    type: "Symbol",
                    name: t.blockTabSectionsEntry.fields.name,
                    required: true,
                });

                blockTabSectionsEntry.createField("title", {
                    type: "Symbol",
                    name: t.blockTabSectionsEntry.fields.title,
                    required: true,
                });

                blockTabSectionsEntry.createField("content", {
                    type: "Link",
                    name: t.blockTabSectionsEntry.fields.content,
                    linkType: "Entry",
                    validations: [
                        {
                            linkContentType: [
                                "blockTabSectionText",
                                "blockTabSectionTextColumns",
                                "blockTabSectionTextImage",
                                "blockTabSectionVideo",
                            ],
                        },
                    ],
                    required: true,
                });

                blockTabSectionsEntry.displayField("name");
            },
            6: migration => {
                const blockTabSections = migration.createContentType("blockTabSections", {
                    name: t.blockTabSections.name,
                });

                blockTabSections.createField("headline", {
                    type: "Symbol",
                    name: t.blockTabSections.fields.headline,
                });

                blockTabSections.createField("entries", {
                    type: "Array",
                    name: t.blockTabSections.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockTabSectionsEntry"] }],
                    },
                    required: true,
                    validations: [{ size: { max: 6 } }],
                });

                migrateBaseBlockFields(blockTabSections, language);
            },
            7: migration => {
                const blockTabSections = migration.editContentType("blockTabSections");

                blockTabSections.deleteField("headline");

                blockTabSections.createField("headline", {
                    type: "RichText",
                    name: t.blockTabSections.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockTabSections.moveField("headline").afterField("name");
            },
            8: migration => {
                const blockTabSectionTextImage = migration.editContentType(
                    "blockTabSectionTextImage"
                );

                blockTabSectionTextImage.createField("version", {
                    type: "Symbol",
                    name: t.blockTabSectionTextImage.fields.version.name,
                    required: true,
                    defaultValue: {
                        [language]: t.blockTabSectionTextImage.fields.version.default,
                    },
                    validations: [
                        {
                            in: t.blockTabSectionTextImage.fields.version.in,
                        },
                    ],
                });

                blockTabSectionTextImage.changeFieldControl("version", "builtin", "radio");

                blockTabSectionTextImage.moveField("version").afterField("image");
            },
            9: migration => {
                const blockTabSections = migration.editContentType("blockTabSections");

                blockTabSections.editField("entries", {
                    type: "Array",
                    name: t.blockTabSections.fields.entries,
                    required: true,
                    validations: [{ size: { max: 6 } }],
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [
                            {
                                linkContentType: [
                                    "blockTabSectionText",
                                    "blockTabSectionTextColumns",
                                    "blockTabSectionTextImage",
                                    "blockTabSectionVideo",
                                ],
                            },
                        ],
                    },
                });

                const blockTabSectionText = migration.editContentType("blockTabSectionText");

                blockTabSectionText.createField("title", {
                    type: "Symbol",
                    name: t.blockTabSectionText.fields.title,
                    required: true,
                });

                blockTabSectionText.moveField("title").afterField("name");

                const blockTabSectionTextColumns = migration.editContentType(
                    "blockTabSectionTextColumns"
                );

                blockTabSectionTextColumns.createField("title", {
                    type: "Symbol",
                    name: t.blockTabSectionTextColumns.fields.title,
                    required: true,
                });

                blockTabSectionTextColumns.moveField("title").afterField("name");

                const blockTabSectionTextImage = migration.editContentType(
                    "blockTabSectionTextImage"
                );

                blockTabSectionTextImage.createField("title", {
                    type: "Symbol",
                    name: t.blockTabSectionTextImage.fields.title,
                    required: true,
                });

                blockTabSectionTextImage.moveField("title").afterField("name");

                const blockTabSectionVideo = migration.editContentType("blockTabSectionVideo");

                blockTabSectionVideo.createField("title", {
                    type: "Symbol",
                    name: t.blockTabSectionVideo.fields.title,
                    required: true,
                });

                blockTabSectionVideo.moveField("title").afterField("name");

                migration.deleteContentType("blockTabSectionsEntry");
            },
            10: migration => {
                const blockTabSectionText = migration.editContentType("blockTabSectionText");

                blockTabSectionText.displayField("title");

                blockTabSectionText.deleteField("name");

                const blockTabSectionTextColumns = migration.editContentType(
                    "blockTabSectionTextColumns"
                );

                blockTabSectionTextColumns.displayField("title");

                blockTabSectionTextColumns.deleteField("name");

                const blockTabSectionTextImage = migration.editContentType(
                    "blockTabSectionTextImage"
                );

                blockTabSectionTextImage.displayField("title");

                blockTabSectionTextImage.deleteField("name");

                const blockTabSectionVideo = migration.editContentType("blockTabSectionVideo");

                blockTabSectionVideo.displayField("title");

                blockTabSectionVideo.deleteField("name");
            },
            11: migration => {
                const blockTabSectionEntry = migration.createContentType("blockTabSectionEntry", {
                    name: t.blockTabSectionsEntry.name,
                });

                blockTabSectionEntry.createField("title", {
                    type: "Symbol",
                    name: t.blockTabSectionTextImage.fields.title,
                    required: true,
                });

                blockTabSectionEntry.createField("headline", {
                    type: "Symbol",
                    name: t.blockTabSectionTextImage.fields.headline,
                });

                blockTabSectionEntry.createField("text", {
                    type: "RichText",
                    name: t.blockTabSectionTextImage.fields.text,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT_AND_LIST),
                });

                blockTabSectionEntry.createField("image", {
                    type: "Link",
                    name: t.blockTabSectionTextImage.fields.image,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                    required: true,
                });

                blockTabSectionEntry.createField("labeledLink", {
                    type: "Link",
                    name: t.blockTabSectionTextImage.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                blockTabSectionEntry.moveField("labeledLink").afterField("image");

                blockTabSectionEntry.createField("version", {
                    type: "Symbol",
                    name: t.blockTabSectionTextImage.fields.version.name,
                    required: true,
                    defaultValue: {
                        [language]: t.blockTabSectionTextImage.fields.version.default,
                    },
                    validations: [
                        {
                            in: t.blockTabSectionTextImage.fields.version.in,
                        },
                    ],
                });

                blockTabSectionEntry.changeFieldControl("version", "builtin", "radio");

                blockTabSectionEntry.displayField("title");
            },
            12: migration => {
                const blockTabSections = migration.editContentType("blockTabSections");

                blockTabSections.editField("entries").items({
                    type: "Link",
                    linkType: "Entry",
                    validations: [
                        {
                            linkContentType: ["blockTabSectionEntry"],
                        },
                    ],
                });

                migration.deleteContentType("blockTabSectionText");
                migration.deleteContentType("blockTabSectionTextColumns");
                migration.deleteContentType("blockTabSectionTextImage");
                migration.deleteContentType("blockTabSectionVideo");
            },
        },
    };
};
