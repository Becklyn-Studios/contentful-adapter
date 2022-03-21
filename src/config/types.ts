import { BaseComponentConfig, ComponentDataConfig } from "@mayd/ui-types";
import { ContentfulComponentMigration, ContentfulMigrationGenerator } from "../migrations/types";

export type BackendLanguage = "de" | "en";

export interface ContentfulClientConfig {
    spaceId: string;
    management: {
        accessToken: string;
    };
    delivery: {
        accessToken: string;
        previewAccessToken: string;
    };
    environmentId: "master" | "staging" | "integration" | string;
}

export interface MaydContentfulAdapterConfig {
    clientConfig: ContentfulClientConfig;
    backendLanguage: BackendLanguage;
    components: ContentfulComponentConfig[];
    migrations: ContentfulComponentMigration[];
}

export interface ContentfulComponentConfig extends BaseComponentConfig {
    contentType: string;
}

export interface UiComponentDataConfig {
    component: BaseComponentConfig;
    contentType: string;
}

export interface MaydContentfulAdapterConfigFile extends ContentfulClientConfig {
    backendLanguage?: BackendLanguage;
    components?: (UiComponentDataConfig | BaseComponentConfig)[];
    migrations?: ContentfulMigrationGenerator[];
}
