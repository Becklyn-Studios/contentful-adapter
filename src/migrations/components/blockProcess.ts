import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE, RTE_TYPE_STYLED_FONT } from "./rte";

const translations = {
    en: {
        blockProcess: {
            name: "🧩 Block > Process",
            fields: {
                headline: "Headline",
                steps: "Steps",
                labeledLink: "Button",
            },
        },
        blockProcessStep: {
            name: "🧩 Block > Process > Step",
            fields: {
                name: "Internal Name",
                title: "Title",
                text: "Text",
            },
        },
    },
    de: {
        blockProcess: {
            name: "🧩 Block > Prozess",
            fields: {
                headline: "Überschrift",
                steps: "Schritte",
                labeledLink: "Button",
            },
        },
        blockProcessStep: {
            name: "🧩 Block > Prozess > Schritt",
            fields: {
                name: "Interner Name",
                title: "Titel",
                text: "Text",
            },
        },
    },
};

export const getBlockProcessMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockProcess",
        migrations: {
            1: migration => {
                const t = translations[language];

                const blockProcessStep = migration.createContentType("blockProcessStep", {
                    name: t.blockProcessStep.name,
                });

                blockProcessStep.createField("name", {
                    type: "Symbol",
                    name: t.blockProcessStep.fields.name,
                    required: true,
                });

                blockProcessStep.createField("title", {
                    type: "Symbol",
                    name: t.blockProcessStep.fields.title,
                    required: true,
                });

                blockProcessStep.createField("text", {
                    type: "RichText",
                    name: t.blockProcessStep.fields.text,
                    validations: getRteValidation(RTE_TYPE_STYLED_FONT),
                });

                blockProcessStep.displayField("name");

                const blockProcess = migration.createContentType("blockProcess", {
                    name: t.blockProcess.name,
                });

                blockProcess.createField("headline", {
                    type: "Symbol",
                    name: t.blockProcess.fields.headline,
                });

                blockProcess.createField("steps", {
                    type: "Array",
                    name: t.blockProcess.fields.steps,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockProcessStep"] }],
                    },
                    required: true,
                    validations: [{ size: { max: 5 } }],
                });

                blockProcess.createField("labeledLink", {
                    type: "Link",
                    name: t.blockProcess.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                migrateBaseBlockFields(blockProcess, language);
            },
            2: migration => {
                const blockProcess = migration.editContentType("blockProcess");

                blockProcess.deleteField("headline");

                blockProcess.createField("headline", {
                    type: "RichText",
                    name: t.blockProcess.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockProcess.moveField("headline").afterField("name");
            },
        },
    };
};
