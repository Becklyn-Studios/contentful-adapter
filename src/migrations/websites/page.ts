import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";

const translations = {
    en: {
        page: {
            name: "Page",
            fields: {
                name: "Internal Name",
                title: "Page Title",
                slug: {
                    name: "Slug",
                    helpText: "The last part of the URL for this page",
                },
                seo: "SEO Metadata",
                content: "Content",
                childPages: "Child Pages",
            },
        },
        seo: {
            name: "SEO",
            fields: {
                name: "Internal Name",
                title: "Title",
                description: "Description",
                keywords: "Keywords",
                noIndex: {
                    name: "Hide page from search engines (noindex)",
                    true: "Yes",
                    false: "No",
                },
                noFollow: {
                    name: "Exclude links from search rankings (nofollow)",
                    true: "Yes",
                    false: "No",
                },
            },
        },
    },
    de: {
        page: {
            name: "Seite",
            fields: {
                name: "Interner Name",
                title: "Seitentitel",
                slug: {
                    name: "Slug",
                    helpText: "Der letzte Teil der URL für diese Seite",
                },
                seo: "SEO Metadaten",
                content: "Inhalt",
                childPages: "Untergeordnete Seiten",
            },
        },
        seo: {
            name: "SEO",
            fields: {
                name: "Internal Name",
                title: "Titel",
                description: "Beschreibung",
                keywords: "Keywords",
                noIndex: {
                    name: "Seite vor Suchmaschinen verstecken (noindex)",
                    true: "Ja",
                    false: "Nein",
                },
                noFollow: {
                    name: "Links aus Suchrankings ausschließen (nofollow)",
                    true: "Ja",
                    false: "Nein",
                },
            },
        },
    },
};

const getMigration: ContentfulMigrationGenerator = (language): ContentfulComponentMigrations => {
    return {
        component: "page",
        migrations: {
            1: migration => {
                const t = translations[language];

                const page = migration.createContentType("page", {
                    name: t.page.name,
                });

                const seo = migration.createContentType("seo", {
                    name: t.seo.name,
                });

                page.createField("name", {
                    type: "Symbol",
                    name: t.page.fields.name,
                    required: true,
                });

                page.createField("title", {
                    type: "Symbol",
                    name: t.page.fields.title,
                    required: true,
                });

                page.createField("slug", {
                    type: "Symbol",
                    name: t.page.fields.slug.name,
                    required: true,
                });

                page.changeFieldControl("slug", "builtin", "slugEditor", {
                    helpText: t.page.fields.slug.helpText,
                    trackingFieldId: "title",
                });

                page.createField("seo", {
                    type: "Link",
                    name: t.page.fields.seo,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["seo"] }],
                });

                page.changeFieldControl("seo", "builtin", "entryCardEditor");

                page.createField("content", {
                    type: "Link",
                    name: t.page.fields.content,
                    linkType: "Entry",
                    required: true,
                });

                page.changeFieldControl("content", "builtin", "entryCardEditor");

                page.createField("childPages", {
                    type: "Array",
                    name: t.page.fields.childPages,
                    items: {
                        type: "Link",
                        validations: [{ linkContentType: ["page"] }],
                        linkType: "Entry",
                    },
                });

                page.displayField("name");

                seo.createField("name", {
                    type: "Symbol",
                    name: t.seo.fields.name,
                    required: true,
                });

                seo.createField("title", {
                    type: "Symbol",
                    name: t.seo.fields.title,
                    required: true,
                });

                seo.createField("description", {
                    type: "Symbol",
                    name: t.seo.fields.description,
                });

                seo.createField("keywords", {
                    type: "Array",
                    name: t.seo.fields.keywords,
                    items: { type: "Symbol" },
                });

                seo.changeFieldControl("keywords", "builtin", "tagEditor");

                seo.createField("no_index", {
                    type: "Boolean",
                    name: t.seo.fields.noIndex.name,
                });

                seo.changeFieldControl("no_index", "builtin", "boolean", {
                    trueLabel: t.seo.fields.noIndex.true,
                    falseLabel: t.seo.fields.noIndex.false,
                });

                seo.createField("no_follow", {
                    type: "Boolean",
                    name: t.seo.fields.noFollow.name,
                });

                seo.changeFieldControl("no_follow", "builtin", "boolean", {
                    trueLabel: t.seo.fields.noFollow.true,
                    falseLabel: t.seo.fields.noFollow.false,
                });

                seo.displayField("name");
            },
        },
    };
};

export default getMigration;
