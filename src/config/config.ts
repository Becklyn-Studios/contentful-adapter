import findUp from "../../compiled/find-up";
import { register } from "ts-node";
import { config } from "dotenv";
import { MaydContentfulAdapterConfig, MaydContentfulAdapterConfigFile } from "./types";
import { getMigrationsFromGenerators } from "../migrations/migrator";
import { getComponentDataConfig } from "./components";

export const TSCONFIG_FILE_NAME = "tsconfig.mayd-contentful.json";
export const MAYD_CONFIG_FILE_NAME = "mayd-contentful.config.ts";

export const loadConfig = async (): Promise<MaydContentfulAdapterConfig> => {
    const path = await findUp(MAYD_CONFIG_FILE_NAME);

    if (!path) {
        throw new Error(`Couldn't find ${MAYD_CONFIG_FILE_NAME}`);
    }

    config();

    register({
        transpileOnly: true,
        project: TSCONFIG_FILE_NAME,
    });

    let configModule: MaydContentfulAdapterConfigFile;

    try {
        const { default: module } = await import(path);
        configModule = module;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to load ${MAYD_CONFIG_FILE_NAME}`);
    }

    return await getConfigFromFile(configModule);
};

export const getConfigFromFile = async (
    file: MaydContentfulAdapterConfigFile
): Promise<MaydContentfulAdapterConfig> => {
    const backendLanguage = file.backendLanguage ?? "en";

    return {
        backendLanguage,
        components: getComponentDataConfig(file.components),
        migrations: await getMigrationsFromGenerators(backendLanguage, file.migrations),
        clientConfig: {
            spaceId: file.spaceId,
            management: file.management,
            delivery: file.delivery,
            environmentId: file.environmentId,
        },
    };
};
