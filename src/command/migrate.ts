import { loadConfig } from "../config/config";
import { executeMigrations } from "../migrations/migrator";

export const executeMigrationCommand = async (): Promise<void> => {
    console.log("Executing migrations...");

    const config = await loadConfig();
    await executeMigrations(config.clientConfig, config.migrations);

    process.exit(0);
};
