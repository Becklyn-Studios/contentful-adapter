import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE, RTE_TYPE_STYLED_FONT_AND_LIST } from "../rte";

const translations = {
    en: {
        blockRatingsSlider: {
            name: "🧩 Block > Ratings Slider",
            fields: {
                headline: "Headline",
                labeledLink: "Button",
            },
        },
    },
    de: {
        blockRatingsSlider: {
            name: "🧩 Block > Bewertungen Slider",
            fields: {
                headline: "Überschrift",
                labeledLink: "Button",
            },
        },
    },
};

export const getBlockRatingsSliderMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockRatingsSlider",
        migrations: {
            1: migration => {
                const t = translations[language];

                const blockRatingsSlider = migration.createContentType("blockRatingsSlider", {
                    name: t.blockRatingsSlider.name,
                });

                blockRatingsSlider.createField("headline", {
                    type: "Symbol",
                    name: t.blockRatingsSlider.fields.headline,
                });

                blockRatingsSlider.createField("labeledLink", {
                    type: "Link",
                    name: t.blockRatingsSlider.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                migrateBaseBlockFields(blockRatingsSlider, language);
            },
            2: migration => {
                const blockRatingsSlider = migration.editContentType("blockRatingsSlider");

                blockRatingsSlider.deleteField("headline");

                blockRatingsSlider.createField("headline", {
                    type: "RichText",
                    name: t.blockRatingsSlider.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockRatingsSlider.moveField("headline").afterField("name");
            },
        },
    };
};
