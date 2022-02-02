import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";

const translations = {
    en: {
        externalReference: {
            name: "Basic > External Reference",
            fields: {
                url: "URL",
                inNewTab: {
                    name: "Open in new tab",
                    true: "Yes",
                    false: "No",
                },
            },
        },
        labeledLink: {
            name: "Basic > Labeled Link",
            fields: {
                label: "Label",
                reference: "Reference",
            },
        },
    },
    de: {
        externalReference: {
            name: "Basic > Externe Referenz",
            fields: {
                url: "URL",
                inNewTab: {
                    name: "In neuem Tab öffnen",
                    true: "Ja",
                    false: "Nein",
                },
            },
        },
        labeledLink: {
            name: "Basic > Link mit Label",
            fields: {
                label: "Label",
                reference: "Referenz",
            },
        },
    },
};

const getMigration: ContentfulMigrationGenerator = (language): ContentfulComponentMigrations => {
    return {
        component: "reference",
        migrations: {
            1: migration => {
                const t = translations[language];

                const externalReference = migration.createContentType("externalReference", {
                    name: t.externalReference.name,
                });

                externalReference.createField("url", {
                    type: "Symbol",
                    name: t.externalReference.fields.url,
                    required: true,
                });

                externalReference.changeFieldControl("url", "builtin", "urlEditor");

                externalReference.createField("inNewTab", {
                    type: "Boolean",
                    name: t.externalReference.fields.inNewTab.name,
                    required: true,
                });

                externalReference.changeFieldControl("inNewTab", "builtin", "boolean", {
                    trueLabel: t.externalReference.fields.inNewTab.true,
                    falseLabel: t.externalReference.fields.inNewTab.false,
                });

                const labeledLink = migration.createContentType("labeledLink", {
                    name: t.labeledLink.name,
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
                            linkContentType: ["page", "externalReference"],
                        },
                    ],
                });

                labeledLink.displayField("label");
            },
        },
    };
};

export default getMigration;
