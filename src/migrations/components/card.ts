import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";

const translations = {
    en: {
        card: {
            name: "Basic > Card",
            fields: {
                image: "Image",
                overline: "Overline",
                headline: "Headline",
                text: "Text",
                labeledLink: "Button",
            },
        },
    },
    de: {
        card: {
            name: "Basic > Card",
            fields: {
                image: "Bild",
                overline: "Overline",
                headline: "Überschrift",
                text: "Text",
                labeledLink: "Button",
            },
        },
    },
};

export const getCardMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    return {
        component: "card",
        migrations: {
            1: migration => {
                const t = translations[language];

                const card = migration.createContentType("card", {
                    name: t.card.name,
                });

                card.createField("overline", {
                    type: "Symbol",
                    name: t.card.fields.overline,
                });

                card.createField("headline", {
                    type: "Symbol",
                    name: t.card.fields.headline,
                    required: true,
                });

                card.createField("text", {
                    type: "Symbol",
                    name: t.card.fields.text,
                    required: true,
                });

                card.createField("image", {
                    type: "Link",
                    name: t.card.fields.image,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                });

                card.createField("labeledLink", {
                    type: "Link",
                    name: t.card.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                card.displayField("headline");
            },
        },
    };
};
