import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";

const translations = {
    en: {
        blockLogosSlider: {
            name: "Block > Logo Slider",
            fields: {
                headline: "Headline",
                entries: "Entries",
            },
        },
        blockLogosSliderLogo: {
            name: "Block > Logo Slider > Logo",
            fields: {
                name: "Internal Name",
                image: "Logo",
                labeledLink: "Link",
            },
        },
    },
    de: {
        blockLogosSlider: {
            name: "Block > Logo Slider",
            fields: {
                headline: "Überschrift",
                entries: "Einträge",
            },
        },
        blockLogosSliderLogo: {
            name: "Block > Logo Slider > Logo",
            fields: {
                name: "Interner Name",
                image: "Logo",
                labeledLink: "Link",
            },
        },
    },
};

export const getBlockLogosSliderMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    return {
        component: "blockLogosSlider",
        migrations: {
            1: migration => {
                const t = translations[language];

                const blockLogosSliderLogo = migration.createContentType("blockLogosSliderLogo", {
                    name: t.blockLogosSliderLogo.name,
                });

                blockLogosSliderLogo.createField("name", {
                    type: "Symbol",
                    name: t.blockLogosSliderLogo.fields.name,
                    required: true,
                });

                blockLogosSliderLogo.createField("image", {
                    type: "Link",
                    name: t.blockLogosSliderLogo.fields.image,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                    required: true,
                });

                blockLogosSliderLogo.createField("labeledLink", {
                    type: "Link",
                    name: t.blockLogosSliderLogo.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                blockLogosSliderLogo.displayField("name");

                const blockLogosSlider = migration.createContentType("blockLogosSlider", {
                    name: t.blockLogosSlider.name,
                });

                blockLogosSlider.createField("headline", {
                    type: "Symbol",
                    name: t.blockLogosSlider.fields.headline,
                    required: true,
                });

                blockLogosSlider.createField("entries", {
                    type: "Array",
                    name: t.blockLogosSlider.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockLogosSliderLogo"] }],
                    },
                    required: true,
                });

                migrateBaseBlockFields(blockLogosSlider, language);

                blockLogosSlider.displayField("headline");
            },
        },
    };
};
