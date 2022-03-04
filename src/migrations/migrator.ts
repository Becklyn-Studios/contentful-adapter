import { BackendLanguage, ContentfulClientConfig } from "../config/types";
import { ContentfulComponentMigration, ContentfulMigrationGenerator } from "./types";
import getMigration, { MIGRATIONS_MODEL_NAME } from "./migration";
import {
    connectToContentfulManagementApi,
    getDefaultLocale,
    getExecutedMigrations,
} from "../contentful/api";
import { Environment } from "contentful-management";
import { runMigration } from "contentful-migration";

export const executeMigrations = async (
    clientConfig: ContentfulClientConfig,
    allMigrations: ContentfulComponentMigration[]
) => {
    const environment = await connectToContentfulManagementApi(clientConfig);
    const locale = await getDefaultLocale(environment);
    const executedMigrations = await getExecutedMigrations(environment, locale);
    const filteredMigrations = allMigrations.filter(
        migration => !executedMigrations.includes(migration.key)
    );

    await runMigrations(filteredMigrations, environment, locale, clientConfig);
};

const runMigrations = async (
    migrations: ContentfulComponentMigration[],
    environment: Environment,
    locale: string,
    config: ContentfulClientConfig
) => {
    console.log(`Running ${migrations.length} migrations`);

    for (let i = 0; i < migrations.length; i++) {
        await runSingleMigration(migrations[i], environment, locale, config);
    }

    console.log(`All migrations were successful`);
};

const runSingleMigration = async (
    migration: ContentfulComponentMigration,
    environment: Environment,
    locale: string,
    config: ContentfulClientConfig
) => {
    console.log(`Running migration "${migration.key}"`);

    await runMigration({
        migrationFunction: migration.migration,
        spaceId: config.spaceId,
        accessToken: config.management.accessToken,
        environmentId: config.environmentId,
        yes: true,
    });

    console.log(`Migration "${migration.key}" succeeded`);

    const newVersionEntry = await environment.createEntry(MIGRATIONS_MODEL_NAME, {
        fields: {
            version: {
                [locale]: migration.key,
            },
            executedAt: {
                [locale]: new Date().toString(),
            },
        },
    });

    await newVersionEntry.publish();

    console.log(`Saved ${migration.key} to ${MIGRATIONS_MODEL_NAME}`);
};

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
