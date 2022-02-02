import fs from "fs";
import { MAYD_CONFIG_FILE_NAME, TSCONFIG_FILE_NAME } from "../config/config";

export const MODULE_PATH = "node_modules/@mayd/contentful-adapter";

export const executeSetupCommand = async (): Promise<void> => {
    console.log("Setting up Mayd-contentful configuration...");

    await setupTsConfig();
    await setupMaydContentfulConfig();

    console.log("Success");
    process.exit(0);
};

export const setupTsConfig = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        fs.readFile(TSCONFIG_FILE_NAME, err => {
            if (null === err) {
                resolve();
            } else if (err.code === "ENOENT") {
                fs.copyFile(
                    `${MODULE_PATH}/setup/${TSCONFIG_FILE_NAME}`,
                    TSCONFIG_FILE_NAME,
                    err => {
                        if (null === err) {
                            resolve();
                        } else {
                            reject(
                                `Cannot write "${MODULE_PATH}/setup/${TSCONFIG_FILE_NAME}": ${err.message}`
                            );
                        }
                    }
                );
            } else {
                reject(`Cannot read "${TSCONFIG_FILE_NAME}": ${err.message}`);
            }
        });
    });
};

export const setupMaydContentfulConfig = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        fs.readFile(MAYD_CONFIG_FILE_NAME, err => {
            if (null === err) {
                resolve();
            } else if (err.code === "ENOENT") {
                fs.copyFile(
                    `${MODULE_PATH}/setup/${MAYD_CONFIG_FILE_NAME}`,
                    MAYD_CONFIG_FILE_NAME,
                    err => {
                        if (null === err) {
                            resolve();
                        } else {
                            reject(
                                `Cannot write "${MODULE_PATH}/setup/${MAYD_CONFIG_FILE_NAME}": ${err.message}`
                            );
                        }
                    }
                );
            } else {
                reject(`Cannot read "${MAYD_CONFIG_FILE_NAME}": ${err.message}`);
            }
        });
    });
};
