import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_STYLED_FONT_AND_LIST } from "./rte";

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
                text: "Text",
                image: "Image",
                labeledLink: "Button",
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
                text: "Text",
                image: "Bild",
                labeledLink: "Button",
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

                blockTextImage.createField("text", {
                    type: "RichText",
                    name: t.blockTextImage.fields.text,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT_AND_LIST),
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

                migrateBaseBlockFields(blockTextImage, language);

                blockTextImage.displayField("headline");
            },
        },
    };
};
