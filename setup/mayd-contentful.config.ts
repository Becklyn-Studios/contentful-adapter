import { MaydContentfulAdapterConfigFile } from "@mayd/contentful-adapter";

// configure your project using this object.
const config: MaydContentfulAdapterConfigFile = {
    spaceId: process.env.CONTENTFUL_SPACE_ID ?? "",
    delivery: {
        accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN ?? "",
        previewAccessToken: process.env.CONTENTFUL_DELIVERY_PREVIEW_ACCESS_TOKEN ?? "",
    },
    management: {
        accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN ?? "",
    },
    environmentId: process.env.CONTENTFUL_ENVIRONMENT_ID ?? "",
    backendLanguage: "en",
    components: [],
    migrations: [],
};

export default config;
