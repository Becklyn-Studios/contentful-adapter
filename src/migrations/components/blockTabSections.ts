import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_STYLED_FONT_AND_LIST } from "./rte";
import migration from "../migration";

const translations = {
    en: {
        blockTabSections: {
            name: "Block > Tabs",
            fields: {
                headline: "Headline",
                entries: "Tabs",
            },
        },
        blockTabSectionsEntry: {
            name: "Block > Tabs > Tab",
            fields: {
                title: "Title",
                content: "Content",
            },
        },
        blockTabSectionText: {
            name: "Block > Tabs > Text Section",
            fields: {
                name: "Internal Name",
                headline: "Headline",
                text: "Text",
            },
        },
        blockTabSectionTextColumns: {
            name: "Block > Tabs > Text Cloumns Section",
            fields: {
                name: "Internal Name",
                headline: "Headline",
                firstColumn: "Text Left",
                secondColumn: "Text Right",
            },
        },
        blockTabSectionTextImage: {
            name: "Block > Tabs > Text Image Section",
            fields: {
                name: "Internal Name",
                headline: "Headline",
                text: "Text",
                image: "Image",
            },
        },
        blockTabSectionVideo: {
            name: "Block > Tabs > Video Section",
            fields: {
                name: "Internal Name",
                video: "Video",
            },
        },
    },
    de: {
        blockTabSections: {
            name: "Block > Tabs",
            fields: {
                headline: "Überschrift",
                entries: "Tabs",
            },
        },
        blockTabSectionsEntry: {
            name: "Block > Tabs > Tab",
            fields: {
                title: "Titel",
                content: "Inhalt",
            },
        },
        blockTabSectionText: {
            name: "Block > Tabs > Text Sektion",
            fields: {
                name: "Interner Name",
                headline: "Überschrift",
                text: "Text",
            },
        },
        blockTabSectionTextColumns: {
            name: "Block > Tabs > Text Spalten Sektion",
            fields: {
                name: "Interner Name",
                headline: "Überschrift",
                firstColumn: "Text Links",
                secondColumn: "Text Rechts",
            },
        },
        blockTabSectionTextImage: {
            name: "Block > Tabs > Text Bild Sektion",
            fields: {
                name: "Interner Name",
                headline: "Überschrift",
                text: "Text",
                image: "Bild",
            },
        },
        blockTabSectionVideo: {
            name: "Block > Tabs > Video Sektion",
            fields: {
                name: "Interner Name",
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

                blockTabSectionsEntry.displayField("blockTabSectionsEntry");
            },
            6: migration => {
                const blockTabSections = migration.createContentType("blockTabSections", {
                    name: t.blockTabSections.name,
                });

                blockTabSections.createField("headline", {
                    type: "Symbol",
                    name: t.blockTabSections.fields.headline,
                    required: true,
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

                blockTabSections.displayField("headline");
            },
        },
    };
};
