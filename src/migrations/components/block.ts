import { ContentType } from "contentful-migration";
import { BackendLanguage } from "../../config/types";

export const THEME_BLOCK = {
    en: {
        background: "With background",
        noBackground: "Without background",
    },
    de: {
        background: "Mit Hintergrund",
        noBackground: "Kein Hintergrund",
    },
};

const translations = {
    en: {
        name: "Internal Name",
        theme: {
            name: "Theme",
            default: THEME_BLOCK.en.noBackground,
            in: [THEME_BLOCK.en.noBackground, THEME_BLOCK.en.background],
        },
        anchor: "Anchor",
        anchorLabel: "Anchor Label",
    },
    de: {
        name: "Interner Name",
        theme: {
            name: "Theme",
            default: THEME_BLOCK.de.noBackground,
            in: [THEME_BLOCK.de.noBackground, THEME_BLOCK.de.background],
        },
        anchor: "Anker",
        anchorLabel: "Anker Label",
    },
};

export const migrateBaseBlockFields = (
    block: ContentType,
    language: BackendLanguage,
    trackingFieldId: string = "headline"
) => {
    const t = translations[language];

    block.createField("theme", {
        type: "Symbol",
        name: t.theme.name,
        required: true,
        defaultValue: {
            [language]: t.theme.default,
        },
        validations: [
            {
                in: t.theme.in,
            },
        ],
    });

    block.changeFieldControl("theme", "builtin", "radio");

    block.createField("anchor", {
        type: "Symbol",
        name: t.anchor,
        required: true,
    });

    block.changeFieldControl("anchor", "builtin", "slugEditor", {
        trackingFieldId,
    });

    block.createField("anchorLabel", {
        type: "Symbol",
        name: t.anchorLabel,
        validations: [{ size: { max: 25 } }],
    });

    block.createField("name", {
        type: "Symbol",
        name: t.name,
        required: true,
    });

    block.moveField("name").toTheTop();

    block.displayField("name");
};
