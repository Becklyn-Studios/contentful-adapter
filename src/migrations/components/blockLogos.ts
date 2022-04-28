import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE } from "../rte";

export const VERSION_BLOCK_TEXT_IMAGE = {
    en: {
        default: "Default",
        monochrome: "Monochrome",
    },
    de: {
        default: "Standard",
        monochrome: "Monochrom",
    },
};

const translations = {
    en: {
        blockLogos: {
            name: "🧩 Block > Logos",
            fields: {
                headline: "Headline",
                entries: "Entries",
                version: {
                    name: "Version",
                    default: VERSION_BLOCK_TEXT_IMAGE.en.default,
                    in: [
                        VERSION_BLOCK_TEXT_IMAGE.en.default,
                        VERSION_BLOCK_TEXT_IMAGE.en.monochrome,
                    ],
                },
            },
        },
        blockLogosLogo: {
            name: "🧩 Block > Logos > Logo",
            fields: {
                name: "Internal Name",
                image: "Logo",
                labeledLink: "Link",
            },
        },
    },
    de: {
        blockLogos: {
            name: "🧩 Block > Logos",
            fields: {
                headline: "Überschrift",
                entries: "Einträge",
                version: {
                    name: "Version",
                    default: VERSION_BLOCK_TEXT_IMAGE.de.default,
                    in: [
                        VERSION_BLOCK_TEXT_IMAGE.de.default,
                        VERSION_BLOCK_TEXT_IMAGE.de.monochrome,
                    ],
                },
            },
        },
        blockLogosLogo: {
            name: "🧩 Block > Logos > Logo",
            fields: {
                name: "Interner Name",
                image: "Logo",
                labeledLink: "Link",
            },
        },
    },
};

export const getBlockLogosMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockLogos",
        migrations: {
            1: migration => {
                const blockLogosLogo = migration.createContentType("blockLogosLogo", {
                    name: t.blockLogosLogo.name,
                });

                blockLogosLogo.createField("name", {
                    type: "Symbol",
                    name: t.blockLogosLogo.fields.name,
                    required: true,
                });

                blockLogosLogo.createField("image", {
                    type: "Link",
                    name: t.blockLogosLogo.fields.image,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                    required: true,
                });

                blockLogosLogo.createField("labeledLink", {
                    type: "Link",
                    name: t.blockLogosLogo.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                blockLogosLogo.displayField("name");

                const blockLogos = migration.createContentType("blockLogos", {
                    name: t.blockLogos.name,
                });

                blockLogos.createField("headline", {
                    type: "Symbol",
                    name: t.blockLogos.fields.headline,
                });

                blockLogos.createField("entries", {
                    type: "Array",
                    name: t.blockLogos.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockLogosLogo"] }],
                    },
                    required: true,
                });

                migrateBaseBlockFields(blockLogos, language);
            },
            2: migration => {
                const blockLogos = migration.editContentType("blockLogos");

                blockLogos.deleteField("headline");

                blockLogos.createField("headline", {
                    type: "RichText",
                    name: t.blockLogos.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockLogos.moveField("headline").afterField("name");
            },
            3: migration => {
                const blockLogos = migration.editContentType("blockLogos");

                blockLogos.createField("version", {
                    type: "Symbol",
                    name: t.blockLogos.fields.version.name,
                    required: true,
                    defaultValue: {
                        [language]: t.blockLogos.fields.version.default,
                    },
                    validations: [
                        {
                            in: t.blockLogos.fields.version.in,
                        },
                    ],
                });

                blockLogos.changeFieldControl("version", "builtin", "radio");

                blockLogos.moveField("version").afterField("theme");
            },
        },
    };
};
