import findUp from "../../compiled/find-up";
import { register } from "ts-node";
import { config } from "dotenv";
import { ContentfulAdapterConfig, ContentfulAdapterConfigFile } from "./types";
import { getComponentDataConfig } from "./components";
import { getMigrationsFromGenerators } from "../migrations/generator";

export const TSCONFIG_FILE_NAME = "tsconfig.becklyn-contentful.json";
export const CONFIG_FILE_NAME = "becklyn-contentful.config.ts";

export const loadConfig = async (): Promise<ContentfulAdapterConfig> => {
    const path = await findUp(CONFIG_FILE_NAME);

    if (!path) {
        throw new Error(`Couldn't find ${CONFIG_FILE_NAME}`);
    }

    config();

    register({
        transpileOnly: true,
        project: TSCONFIG_FILE_NAME,
    });

    let configModule: ContentfulAdapterConfigFile;

    try {
        const { default: module } = await import(path);
        configModule = module;
    } catch (error) {
        console.log(error);
        throw new Error(`Failed to load ${CONFIG_FILE_NAME}`);
    }

    return await getConfigFromFile(configModule);
};

export const getConfigFromFile = async (
    file: ContentfulAdapterConfigFile
): Promise<ContentfulAdapterConfig> => {
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
