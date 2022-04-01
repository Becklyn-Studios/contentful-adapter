import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    rootDir: "./test",
    preset: "ts-jest",
    testEnvironment: "node",
};
export default config;
