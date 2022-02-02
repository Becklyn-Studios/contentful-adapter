import { MigrationFunction } from "contentful-migration";
import { BackendLanguage } from "../config/types";

export interface ContentfulComponentMigrations {
    component: string;
    migrations: Record<string, MigrationFunction>;
}

export type ContentfulMigrationGenerator = (
    language: BackendLanguage
) => ContentfulComponentMigrations;

export interface ContentfulComponentMigration {
    key: string;
    migration: MigrationFunction;
}
