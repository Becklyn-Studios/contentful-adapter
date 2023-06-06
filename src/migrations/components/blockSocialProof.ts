import { ContentfulComponentMigrations, ContentfulMigrationGenerator } from "../types";
import { migrateBaseBlockFields } from "./block";
import { getRteValidation, RTE_TYPE_HEADLINE } from "../rte";
import {
    BLOCK_VARIANT_BLACK,
    BLOCK_VARIANT_BRAND,
    BLOCK_VARIANT_GRAY,
    BLOCK_VARIANT_PRIMARY,
    BLOCK_VARIANT_SECONDARY,
    BLOCK_VARIANT_WHITE,
} from "../constants/blockVariant";

const translations = {
    en: {
        blockSocialProof: {
            name: "🧩 Block > Social Proof",
            fields: {
                headline: "Headline",
                entries: "Entries",
                variant: "Variant",
            },
        },
        blockSocialProofEntry: {
            name: "🧩 Block > Social Proof > Entry",
            fields: {
                name: "Internal Name",
                image: "Image",
                labeledLink: "Link",
            },
        },
    },
    de: {
        blockSocialProof: {
            name: "🧩 Block > Social Proof",
            fields: {
                headline: "Überschrift",
                entries: "Einträge",
                variant: "Variante",
            },
        },
        blockSocialProofEntry: {
            name: "🧩 Block > Social Proof > Eintrag",
            fields: {
                name: "Interner Name",
                image: "Bild",
                labeledLink: "Link",
            },
        },
    },
};

export const getBlockSocialProofMigration: ContentfulMigrationGenerator = (
    language
): ContentfulComponentMigrations => {
    const t = translations[language];

    return {
        component: "blockSocialProof",
        migrations: {
            1: migration => {
                const t = translations[language];

                const blockSocialProofEntry = migration.createContentType("blockSocialProofEntry", {
                    name: t.blockSocialProofEntry.name,
                });

                blockSocialProofEntry.createField("name", {
                    type: "Symbol",
                    name: t.blockSocialProofEntry.fields.name,
                    required: true,
                });

                blockSocialProofEntry.createField("image", {
                    type: "Link",
                    name: t.blockSocialProofEntry.fields.image,
                    linkType: "Asset",
                    validations: [{ linkMimetypeGroup: ["image"] }],
                    required: true,
                });

                blockSocialProofEntry.createField("labeledLink", {
                    type: "Link",
                    name: t.blockSocialProofEntry.fields.labeledLink,
                    linkType: "Entry",
                    validations: [{ linkContentType: ["labeledLink"] }],
                });

                blockSocialProofEntry.displayField("name");

                const blockSocialProof = migration.createContentType("blockSocialProof", {
                    name: t.blockSocialProof.name,
                });

                blockSocialProof.createField("headline", {
                    type: "Symbol",
                    name: t.blockSocialProof.fields.headline,
                });

                blockSocialProof.createField("entries", {
                    type: "Array",
                    name: t.blockSocialProof.fields.entries,
                    items: {
                        type: "Link",
                        linkType: "Entry",
                        validations: [{ linkContentType: ["blockSocialProofEntry"] }],
                    },
                    required: true,
                });

                migrateBaseBlockFields(blockSocialProof, language);
            },
            2: migration => {
                const blockSocialProof = migration.editContentType("blockSocialProof");

                blockSocialProof.deleteField("headline");

                blockSocialProof.createField("headline", {
                    type: "RichText",
                    name: t.blockSocialProof.fields.headline,
                    validations: getRteValidation(RTE_TYPE_HEADLINE),
                });

                blockSocialProof.moveField("headline").afterField("name");
            },
            3: migration => {
                const blockSocialProof = migration.editContentType("blockSocialProof");

                blockSocialProof.createField("variant", {
                    type: "Symbol",
                    name: t.blockSocialProof.fields.variant,
                    validations: [
                        {
                            in: [
                                BLOCK_VARIANT_BRAND,
                                BLOCK_VARIANT_PRIMARY,
                                BLOCK_VARIANT_SECONDARY,
                                BLOCK_VARIANT_WHITE,
                                BLOCK_VARIANT_BLACK,
                                BLOCK_VARIANT_GRAY,
                            ],
                        },
                    ],
                });

                blockSocialProof.changeFieldControl("variant", "builtin", "dropdown");
            },
        },
    };
};
