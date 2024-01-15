import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "../components/block";
import {
    getRteValidation,
    RTE_TYPE_HEADLINE,
    RTE_TYPE_STYLED_FONT,
    RTE_TYPE_STYLED_FONT_AND_LIST,
} from "../rte";
import migration from "../migration";

const translations = {
    en: {
        rteMedia: {
            name: "⚙️ Basic > RTE Media",
            fields: {
                name: "Internal Name",
                media: "Media",
                footnote: "Footnote",
            },
        },
        rteQuote: {
            name: "⚙️ Basic > RTE Quote",
            fields: {
                name: "Internal Name",
                text: "Text",
                footnote: "Footnote",
            },
        },
        rteIcon: {
            name: "⚙️ Basic > RTE Icon",
            fields: {
                name: "Internal Name",
                text: "Text",
                icon: "Icon",
            },
        },
        rteHint: {
            name: "⚙️ Basic > RTE Hint",
            fields: {
                name: "Internal Name",
                text: "Text",
            },
        },
        rteImage: {
            name: "⚙️ Basic > RTE Image",
            fields: {
                name: "Internal Name",
                image: "image",
            },
        },
    },
    de: {
        rteMedia: {
            name: "⚙️ Basic > RTE Media",
            fields: {
                name: "Interner Name",
                media: "Media",
                footnote: "Fußnote",
            },
        },
        rteQuote: {
            name: "⚙️ Basic > RTE Zitat",
            fields: {
                name: "Interner Name",
                text: "Text",
                footnote: "Fußnote",
            },
        },
        rteIcon: {
            name: "⚙️ Basic > RTE Icon",
            fields: {
                name: "Internal Name",
                text: "Text",
                icon: "Icon",
            },
        },
        rteHint: {
            name: "⚙️ Basic > RTE Hinweis",
            fields: {
                name: "Internal Name",
                text: "Text",
            },
        },
        rteTag: {
            name: "⚙️ Basic > RTE Tag",
            fields: {
                name: "Internal Name",
                text: "Text",
            },
        },
        rteImage: {
            name: "⚙️ Basic > RTE Bild",
            fields: {
                name: "Internal Name",
                image: "Bild",
            },
        },
    },
};

export const getRteBasicsMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "rteBasics",
        migrations: {
            1: migration => {
                const rteMedia = migration.createContentType("rteMedia", {
                    name: t.rteMedia.name,
                });

                rteMedia.createField("name", {
                    type: "Symbol",
                    name: t.rteMedia.fields.name,
                    required: true,
                });

                rteMedia.createField("media", {
                    type: "Link",
                    name: t.rteMedia.fields.media,
                    linkType: "Asset",
                    required: true,
                    validations: [{ linkMimetypeGroup: ["image", "video"] }],
                });

                rteMedia.createField("footnote", {
                    type: "RichText",
                    name: t.rteMedia.fields.footnote,
                    validations: getRteValidation(),
                });

                rteMedia.displayField("name");
            },
            2: migration => {
                const rteQuote = migration.createContentType("rteQuote", {
                    name: t.rteQuote.name,
                });

                rteQuote.createField("name", {
                    type: "Symbol",
                    name: t.rteQuote.fields.name,
                    required: true,
                });

                rteQuote.createField("text", {
                    type: "Text",
                    name: t.rteQuote.fields.text,
                    required: true,
                });

                rteQuote.changeFieldControl("text", "builtin", "multipleLine");

                rteQuote.createField("footnote", {
                    type: "Symbol",
                    name: t.rteQuote.fields.footnote,
                });

                rteQuote.displayField("name");
            },
            3: migration => {
                const rteIcon = migration.createContentType("rteIcon", {
                    name: t.rteIcon.name,
                });

                rteIcon.createField("name", {
                    type: "Symbol",
                    name: t.rteQuote.fields.name,
                    required: true,
                });

                rteIcon.createField("text", {
                    type: "RichText",
                    name: t.rteQuote.fields.text,
                    validations: getRteValidation(),
                    required: true,
                });

                rteIcon.createField("icon", {
                    type: "Link",
                    name: t.rteIcon.fields.icon,
                    linkType: "Asset",
                    required: true,
                    validations: [{ linkMimetypeGroup: ["image"] }],
                });

                rteIcon.displayField("name");
            },
            4: migration => {
                const rteHint = migration.createContentType("rteHint", {
                    name: t.rteHint.name,
                });

                rteHint.createField("name", {
                    type: "Symbol",
                    name: t.rteQuote.fields.name,
                    required: true,
                });

                rteHint.createField("text", {
                    type: "Text",
                    name: t.rteQuote.fields.text,
                    required: true,
                });

                rteHint.displayField("name");

                const rteImage = migration.createContentType("rteImage", {
                    name: t.rteImage.name,
                });

                rteImage.createField("name", {
                    type: "Symbol",
                    name: t.rteQuote.fields.name,
                    required: true,
                });

                rteImage.createField("image", {
                    type: "Link",
                    name: t.rteImage.fields.image,
                    linkType: "Asset",
                    required: true,
                    validations: [{ linkMimetypeGroup: ["image"] }],
                });

                rteImage.displayField("name");
            },
            5: migration => {
                const rteIcon = migration.editContentType("rteIcon");

                rteIcon.editField("text", {
                    type: "RichText",
                    name: t.rteQuote.fields.text,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT),
                    required: true,
                });
            },
        },
    };
};
