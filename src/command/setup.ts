import fs from "fs";
import { CONFIG_FILE_NAME, TSCONFIG_FILE_NAME } from "../config/config";

export const MODULE_PATH = "node_modules/@becklyn/contentful-adapter";

export const executeSetupCommand = async (): Promise<void> => {
    console.log("Setting up contentful configuration...");

    await setupTsConfig();
    await setupContentfulConfig();

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

export const setupContentfulConfig = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        fs.readFile(CONFIG_FILE_NAME, err => {
            if (null === err) {
                resolve();
            } else if (err.code === "ENOENT") {
                fs.copyFile(`${MODULE_PATH}/setup/${CONFIG_FILE_NAME}`, CONFIG_FILE_NAME, err => {
                    if (null === err) {
                        resolve();
                    } else {
                        reject(
                            `Cannot write "${MODULE_PATH}/setup/${CONFIG_FILE_NAME}": ${err.message}`
                        );
                    }
                });
            } else {
                reject(`Cannot read "${CONFIG_FILE_NAME}": ${err.message}`);
            }
        });
    });
};
