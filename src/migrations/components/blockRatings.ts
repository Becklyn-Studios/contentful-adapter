import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";

const translations = {
    en: {
        blockRatings: {
            name: "Block > Ratings",
            fields: {
                name: "Internal Name",
                entries: "Entries",
            },
        },
        blockRatingsEntry: {
            name: "Block > Ratings > Eintrag",
            fields: {
                name: "Internal Name",
                rating: "Rating",
                text: "Text",
                image: "Image",
                author: "Author",
            },
        },
        blockRatingsAuthor: {
            name: "Block > Ratings > Author",
            fields: {
                name: "Name",
                image: "Image",
                shortDescription: "Short Description",
            },
        },
    },
    de: {
        blockRatings: {
            name: "Block > Bewertungen",
            fields: {
                name: "Interner Name",
                entries: "Einträge",
            },
        },
        blockRatingsEntry: {
            name: "Block > Bewertungen > Eintrag",
            fields: {
                name: "Interner Name",
                rating: "Bewertung",
                text: "Text",
                image: "Bild",
                author: "Autor",
            },
        },
        blockRatingsAuthor: {
            name: "Block > Bewertungen > Autor",
            fields: {
                name: "Name",
                image: "Bild",
                shortDescription: "Kurzbeschreibung",
            },
        },
    },
};

export const getBlockRatingsMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    return {
        component: "blockRatings",
        migrations: {
            1: migration => {
                const t = translations[language];

                const blockRatingsAuthor = migration.createContentType("blockRatingsAuthor", {
                    name: t.blockRatingsAuthor.name,
                });

                blockRatingsAuthor.createField("name", {
                    type: "Symbol",
                    name: t.blockRatingsAuthor.fields.name,
                    required: true,
                });

                blockRatingsAuthor.createField("shortDescription", {
                    type: "Symbol",
                    name: t.blockRatingsAuthor.fields.shortDescription,
                });

                blockRatingsAuthor.createField("image", {
                    type: "Link",
                    name: t.blockRatingsAuthor.fields.image,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                    required: true,
                });

                blockRatingsAuthor.displayField("name");

                const blockRatingsEntry = migration.createContentType("blockRatingsEntry", {
                    name: t.blockRatingsEntry.name,
                });

                blockRatingsEntry.createField("name", {
                    type: "Symbol",
                    name: t.blockRatingsEntry.fields.name,
                    required: true,
                });

                blockRatingsEntry.createField("rating", {
                    type: "Integer",
                    name: t.blockRatingsEntry.fields.rating,
                    required: true,
                    validations: [{ range: { min: 1, max: 5 } }],
                });

                blockRatingsEntry.createField("text", {
                    type: "Symbol",
                    name: t.blockRatingsEntry.fields.text,
                    required: true,
                });

                blockRatingsEntry.createField("image", {
                    type: "Link",
                    name: t.blockRatingsEntry.fields.image,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                    required: true,
                });

                blockRatingsEntry.createField("author", {
                    type: "Link",
                    name: t.blockRatingsEntry.fields.author,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["blockRatingsAuthor"] }],
                    required: true,
                });

                blockRatingsEntry.displayField("name");

                const blockRatings = migration.createContentType("blockRatings", {
                    name: t.blockRatings.name,
                });

                blockRatings.createField("name", {
                    type: "Symbol",
                    name: t.blockRatings.fields.name,
                    required: true,
                });

                blockRatings.createField("entries", {
                    type: "Array",
                    name: t.blockRatings.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockRatingsEntry"] }],
                    },
                    required: true,
                });

                migrateBaseBlockFields(blockRatings, language, "name");

                blockRatings.displayField("name");
            },
        },
    };
};
