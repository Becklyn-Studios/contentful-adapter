import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE } from "../rte";

const translations = {
    en: {
        blockLogos: {
            name: "🧩 Block > Logos",
            fields: {
                headline: "Headline",
                entries: "Entries",
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
        },
    };
};
