# Contentful adapter

[![CI](https://github.com/Becklyn-Studios/contentful-adapter/actions/workflows/ci.yml/badge.svg)](https://github.com/Becklyn-Studios/contentful-adapter/actions/workflows/ci.yml)

## Usage

Install this library into your project:

```shell
npm i --save @becklyn/contentful-adapter
```

## Config

The `becklyn-contentful setup` command will create some basic configuration in your project:

-   the `tsconfig.becklyn-contentful.json` typescript config file is used to execute typescript within the migration command.
-   the `becklyn-contentful.config.ts` file is used to configure the contentful adapter.
    -   define the backend language in `backendLanguage` (`de` and `en` is avaliable)
    -   add [migration functions](#migrations) in `migrations`
    -   specify components in `components` (not yet documented, might be removed in the future)

## Migrations

To add migrations to your project you can create migration files. These files are usually stored in a dedicated directory of your app.

This example will create a migration for a very basic page type that only contains a text field value.
Migrations are numbered. These numbers are used to identify which migrations have already been executed and which still need to be executed.
A successful migration will never be executed again.

Run the `becklyn-contentful migrate` command to execute all unexecuted migrations.

Example: `migrations/page-type/text.ts`

```typescript
import {
    ContentfulComponentMigrations,
    ContentfulMigrationGenerator,
} from "@becklyn/contentful-adapter";

const translations = {
    en: {
        pageType: {
            name: "Page > Text",
            fields: {
                text: "Text",
            },
        },
    },
    de: {
        pageType: {
            name: "Seite > Text",
            fields: {
                text: "Text",
            },
        },
    },
};

export const getPageTypeTextMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    return {
        component: "page-type-text",
        migrations: {
            1: migration => {
                const t = translations[language];

                const textPage = migration.createContentType("page_text", {
                    name: t.migration.name,
                });

                textPage.createField("text", {
                    type: "Symbol",
                    name: t.migration.fields.text,
                });

                textPage.displayField("text");
            },
        },
    };
};
```

Add this migration (`getPageTypeTextMigration`) to the list of migrations in your `becklyn-contentful.config.ts`.

## TODOs

-   Multi locale support for languages
    -   pass active locales to migrations (besides backend language)
    -   adjust all migrations that have a `defaultValue` configuration
