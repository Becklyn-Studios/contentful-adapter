import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE } from "./rte";

export const VERSION_CARDS_SLIDER_TEASER = {
    en: {
        threeEntries: "Three Entries",
        fourEntries: "Four Entries",
    },
    de: {
        threeEntries: "Drei Einträge",
        fourEntries: "Vier Einträge",
    },
};

const translations = {
    en: {
        blockCardsSliderTeaser: {
            name: "🧩 Block > Cards Slider Teaser",
            fields: {
                overline: "Overline",
                headline: "Headline",
                labeledLink: "Button",
                entries: "Entries",
                version: {
                    name: "Version",
                    default: VERSION_CARDS_SLIDER_TEASER.en.threeEntries,
                    in: [
                        VERSION_CARDS_SLIDER_TEASER.en.threeEntries,
                        VERSION_CARDS_SLIDER_TEASER.en.fourEntries,
                    ],
                },
            },
        },
    },
    de: {
        blockCardsSliderTeaser: {
            name: "🧩 Block > Cards Slider Teaser",
            fields: {
                overline: "Overline",
                headline: "Überschrift",
                labeledLink: "Button",
                entries: "Einträge",
                version: {
                    name: "Version",
                    default: VERSION_CARDS_SLIDER_TEASER.de.threeEntries,
                    in: [
                        VERSION_CARDS_SLIDER_TEASER.de.threeEntries,
                        VERSION_CARDS_SLIDER_TEASER.de.fourEntries,
                    ],
                },
            },
        },
    },
};

export const getBlockCardsSliderTeaserMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockCardsSliderTeaser",
        migrations: {
            1: migration => {
                const blockCardsSliderTeaser = migration.createContentType(
                    "blockCardsSliderTeaser",
                    {
                        name: t.blockCardsSliderTeaser.name,
                    }
                );

                blockCardsSliderTeaser.createField("overline", {
                    type: "Symbol",
                    name: t.blockCardsSliderTeaser.fields.overline,
                });

                blockCardsSliderTeaser.createField("headline", {
                    type: "Symbol",
                    name: t.blockCardsSliderTeaser.fields.headline,
                    required: true,
                });

                blockCardsSliderTeaser.createField("entries", {
                    type: "Array",
                    name: t.blockCardsSliderTeaser.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["card"] }],
                    },
                    required: true,
                });

                blockCardsSliderTeaser.createField("labeledLink", {
                    type: "Link",
                    name: t.blockCardsSliderTeaser.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                migrateBaseBlockFields(blockCardsSliderTeaser, language);
            },
            2: migration => {
                const blockCardsSliderTeaser = migration.editContentType("blockCardsSliderTeaser");

                blockCardsSliderTeaser.deleteField("headline");

                blockCardsSliderTeaser.createField("headline", {
                    type: "RichText",
                    name: t.blockCardsSliderTeaser.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockCardsSliderTeaser.moveField("headline").afterField("name");
            },
            3: migration => {
                const blockCardsSliderTeaser = migration.editContentType("blockCardsSliderTeaser");

                blockCardsSliderTeaser.editField("headline").required(true);
                blockCardsSliderTeaser.moveField("headline").afterField("overline");
            },
            4: migration => {
                const blockCardsSliderTeaser = migration.editContentType("blockCardsSliderTeaser");

                blockCardsSliderTeaser.createField("version", {
                    type: "Symbol",
                    name: t.blockCardsSliderTeaser.fields.version.name,
                    required: true,
                    defaultValue: {
                        [language]: t.blockCardsSliderTeaser.fields.version.default,
                    },
                    validations: [
                        {
                            in: t.blockCardsSliderTeaser.fields.version.in,
                        },
                    ],
                });

                blockCardsSliderTeaser.moveField("version").afterField("theme");
            },
        },
    };
};
