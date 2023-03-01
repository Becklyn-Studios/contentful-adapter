import { BackendLanguage } from "../config/types";
import { ContentfulComponentMigration, ContentfulMigrationGenerator } from "./types";
import getMigration from "./migration";

export const getMigrationsFromGenerators = async (
    language: BackendLanguage,
    generators?: ContentfulMigrationGenerator[]
): Promise<ContentfulComponentMigration[]> => {
    if (!generators) {
        return [];
    }

    const migrations: ContentfulComponentMigration[] = [];
    const migrationKeys: string[] = [];

    generators.forEach(getMigration => {
        const migrationFile = getMigration(language);

        Object.keys(migrationFile.migrations).forEach(key => {
            const migration = migrationFile.migrations[key];
            const migrationKey = `${migrationFile.component}-${key}`;

            if (migrationKeys.includes(migrationKey)) {
                throw new Error(`Migration with migrationKey ${migrationKey} already exists`);
            }

            migrationKeys.push(migrationKey);
            migrations.push({
                key: migrationKey,
                migration,
            });
        });
    });

    if (!migrationKeys.includes("migration-1")) {
        const migrationFile = getMigration(language);

        Object.keys(migrationFile.migrations).forEach(key => {
            const migration = migrationFile.migrations[key];
            const migrationKey = `${migrationFile.component}-${key}`;

            if (migrationKeys.includes(migrationKey)) {
                throw new Error(`Migration with migrationKey ${migrationKey} already exists`);
            }

            migrationKeys.push(migrationKey);
            migrations.unshift({
                key: migrationKey,
                migration,
            });
        });
    }

    return migrations;
};
