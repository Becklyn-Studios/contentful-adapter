import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { INLINES, MARKS } from "@contentful/rich-text-types";

export const THEME_BLOCK_TEXT_IMAGE = {
    en: {
        background: "With background",
        noBackground: "Without background",
    },
    de: {
        background: "Mit Hintergrund",
        noBackground: "Kein Hintergrund",
    },
};

export const VERSION_BLOCK_TEXT_IMAGE = {
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
        blockTextImage: {
            name: "Block > Text Image",
            fields: {
                overline: "Overline",
                headline: "Headline",
                anchor: "Anchor",
                anchorLabel: "Anchor Label",
                text: "Text",
                image: "Image",
                labeledLink: "Button",
                theme: {
                    name: "Theme",
                    default: THEME_BLOCK_TEXT_IMAGE.en.noBackground,
                    in: [
                        THEME_BLOCK_TEXT_IMAGE.en.noBackground,
                        THEME_BLOCK_TEXT_IMAGE.en.background,
                    ],
                },
                version: {
                    name: "Version",
                    default: VERSION_BLOCK_TEXT_IMAGE.en.imageLeft,
                    in: [
                        VERSION_BLOCK_TEXT_IMAGE.en.imageLeft,
                        VERSION_BLOCK_TEXT_IMAGE.en.imageRight,
                    ],
                },
            },
        },
    },
    de: {
        blockTextImage: {
            name: "Block > Text Bild",
            fields: {
                overline: "Overline",
                headline: "Überschrift",
                anchor: "Anker",
                anchorLabel: "Anker Label",
                text: "Text",
                image: "Bild",
                labeledLink: "Button",
                theme: {
                    name: "Theme",
                    default: THEME_BLOCK_TEXT_IMAGE.de.noBackground,
                    in: [
                        THEME_BLOCK_TEXT_IMAGE.de.noBackground,
                        THEME_BLOCK_TEXT_IMAGE.de.background,
                    ],
                },
                version: {
                    name: "Version",
                    default: VERSION_BLOCK_TEXT_IMAGE.de.imageLeft,
                    in: [
                        VERSION_BLOCK_TEXT_IMAGE.de.imageLeft,
                        VERSION_BLOCK_TEXT_IMAGE.de.imageRight,
                    ],
                },
            },
        },
    },
};

export const getBlockTextImageMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    return {
        component: "blockTextImage",
        migrations: {
            1: migration => {
                const t = translations[language];

                const blockTextImage = migration.createContentType("blockTextImage", {
                    name: t.blockTextImage.name,
                });

                blockTextImage.createField("overline", {
                    type: "Symbol",
                    name: t.blockTextImage.fields.overline,
                });

                blockTextImage.createField("headline", {
                    type: "Symbol",
                    name: t.blockTextImage.fields.headline,
                    required: true,
                });

                blockTextImage.createField("anchor", {
                    type: "Symbol",
                    name: t.blockTextImage.fields.anchor,
                    required: true,
                });

                blockTextImage.changeFieldControl("anchor", "builtin", "slugEditor", {
                    trackingFieldId: "headline",
                });

                blockTextImage.createField("anchorLabel", {
                    type: "Symbol",
                    name: t.blockTextImage.fields.anchorLabel,
                    validations: [
                        {
                            size: {
                                max: 25,
                            },
                        },
                    ],
                });

                blockTextImage.createField("text", {
                    type: "RichText",
                    name: t.blockTextImage.fields.text,
                    validations: [
                        { enabledMarks: [MARKS.BOLD, MARKS.ITALIC, MARKS.UNDERLINE] },
                        {
                            enabledNodeTypes: [INLINES.EMBEDDED_ENTRY],
                        },
                        {
                            nodes: {
                                [INLINES.EMBEDDED_ENTRY]: [
                                    {
                                        linkContentType: ["externalReference", "page"],
                                    },
                                ],
                            },
                        },
                    ],
                });

                blockTextImage.createField("image", {
                    type: "Link",
                    name: t.blockTextImage.fields.image,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                    required: true,
                });

                blockTextImage.createField("labeledLink", {
                    type: "Link",
                    name: t.blockTextImage.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                blockTextImage.createField("theme", {
                    type: "Symbol",
                    name: t.blockTextImage.fields.theme.name,
                    required: true,
                    defaultValue: {
                        [language]: t.blockTextImage.fields.theme.default,
                    },
                    validations: [
                        {
                            in: t.blockTextImage.fields.theme.in,
                        },
                    ],
                });

                blockTextImage.changeFieldControl("theme", "builtin", "radio");

                blockTextImage.createField("version", {
                    type: "Symbol",
                    name: t.blockTextImage.fields.version.name,
                    required: true,
                    defaultValue: {
                        [language]: t.blockTextImage.fields.version.default,
                    },
                    validations: [
                        {
                            in: t.blockTextImage.fields.version.in,
                        },
                    ],
                });

                blockTextImage.changeFieldControl("version", "builtin", "radio");

                blockTextImage.displayField("headline");
            },
        },
    };
};
