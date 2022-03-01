import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";

const translations = {
    en: {
        externalReference: {
            name: "⚙️ Basic > External Reference",
            fields: {
                name: "Internal Name",
                url: "URL",
                title: "Title",
                inNewTab: {
                    name: "Open in new tab",
                    true: "Yes",
                    false: "No",
                },
            },
        },
        internalReference: {
            name: "⚙️ Basic > Internal Reference",
            fields: {
                name: "Internal Name",
                reference: "Reference",
                title: "Title",
                inNewTab: {
                    name: "Open in new tab",
                    true: "Yes",
                    false: "No",
                },
            },
        },
        labeledLink: {
            name: "⚙️ Basic > Labeled Link",
            fields: {
                name: "Internal Name",
                label: "Label",
                reference: "Reference",
            },
        },
    },
    de: {
        externalReference: {
            name: "⚙️ Basic > Externe Referenz",
            fields: {
                name: "Interner Name",
                url: "URL",
                title: "Titel",
                inNewTab: {
                    name: "In neuem Tab öffnen",
                    true: "Ja",
                    false: "Nein",
                },
            },
        },
        internalReference: {
            name: "⚙️ Basic > Interne Referenz",
            fields: {
                name: "Interner Name",
                reference: "Referenz",
                title: "Titel",
                inNewTab: {
                    name: "In neuem Tab öffnen",
                    true: "Ja",
                    false: "Nein",
                },
            },
        },
        labeledLink: {
            name: "⚙️ Basic > Link mit Label",
            fields: {
                name: "Interner Name",
                label: "Label",
                reference: "Referenz",
            },
        },
    },
};

export const getReferenceMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    return {
        component: "reference",
        migrations: {
            1: migration => {
                const t = translations[language];

                // external reference
                const externalReference = migration.createContentType("externalReference", {
                    name: t.externalReference.name,
                });

                externalReference.createField("name", {
                    type: "Symbol",
                    name: t.externalReference.fields.name,
                    required: true,
                });

                externalReference.createField("url", {
                    type: "Symbol",
                    name: t.externalReference.fields.url,
                    required: true,
                });

                externalReference.changeFieldControl("url", "builtin", "urlEditor");

                externalReference.createField("title", {
                    type: "Symbol",
                    name: t.externalReference.fields.title,
                    required: false,
                });

                externalReference.createField("inNewTab", {
                    type: "Boolean",
                    name: t.externalReference.fields.inNewTab.name,
                    required: true,
                });

                externalReference.changeFieldControl("inNewTab", "builtin", "boolean", {
                    trueLabel: t.externalReference.fields.inNewTab.true,
                    falseLabel: t.externalReference.fields.inNewTab.false,
                });

                externalReference.displayField("name");

                // internal reference
                const internalReference = migration.createContentType("internalReference", {
                    name: t.internalReference.name,
                });

                internalReference.createField("name", {
                    type: "Symbol",
                    name: t.internalReference.fields.name,
                    required: true,
                });

                internalReference.createField("reference", {
                    type: "Link",
                    name: t.internalReference.fields.reference,
                    required: true,
                    linkType: "Entry",
                    validations: [
                        {
                            linkContentType: ["page"],
                        },
                    ],
                });

                internalReference.changeFieldControl("reference", "builtin", "entryLinkEditor", {
                    showLinkEntityAction: true,
                    showCreateEntityAction: false,
                });

                internalReference.createField("title", {
                    type: "Symbol",
                    name: t.internalReference.fields.title,
                    required: false,
                });

                internalReference.createField("inNewTab", {
                    type: "Boolean",
                    name: t.internalReference.fields.inNewTab.name,
                    required: true,
                });

                internalReference.changeFieldControl("inNewTab", "builtin", "boolean", {
                    trueLabel: t.internalReference.fields.inNewTab.true,
                    falseLabel: t.internalReference.fields.inNewTab.false,
                });

                internalReference.displayField("name");

                // labeled link
                const labeledLink = migration.createContentType("labeledLink", {
                    name: t.labeledLink.name,
                });

                labeledLink.createField("name", {
                    type: "Symbol",
                    name: t.labeledLink.fields.name,
                    required: true,
                });

                labeledLink.createField("label", {
                    type: "Symbol",
                    name: t.labeledLink.fields.label,
                    required: true,
                });

                labeledLink.createField("reference", {
                    type: "Link",
                    name: t.labeledLink.fields.reference,
                    required: true,
                    linkType: "Entry",
                    validations: [
                        {
                            linkContentType: ["internalReference", "externalReference"],
                        },
                    ],
                });

                labeledLink.displayField("name");
            },
        },
    };
};
