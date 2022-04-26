import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";

const translations = {
    en: {
        card: {
            name: "⚙️ Basic > Card",
            fields: {
                name: "Internal Name",
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
            name: "⚙️ Basic > Card",
            fields: {
                name: "Interner Name",
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
    const t = translations[language];

    return {
        component: "card",
        migrations: {
            1: migration => {
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
            2: migration => {
                const card = migration.editContentType("card");

                card.editField("text").required(false);
            },
            3: migration => {
                const card = migration.editContentType("card");

                card.createField("name", {
                    type: "Symbol",
                    name: t.card.fields.name,
                    required: true,
                });

                card.displayField("name");

                migration.transformEntries({
                    contentType: "card",
                    from: ["headline"],
                    to: ["name"],
                    transformEntryForLocale: (fromFields, currentLocale) => {
                        if (!fromFields.headline) {
                            return;
                        }

                        return {
                            name: fromFields.headline[currentLocale],
                        };
                    },
                });

                card.moveField("name").toTheTop();
            },
        },
    };
};
