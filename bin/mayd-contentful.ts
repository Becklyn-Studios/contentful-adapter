#! /usr/bin/env node
import { executeMigrationCommand } from "../src/command/migrate";
import { executeSetupCommand } from "../src/command/setup";

const COMMAND_SETUP = "setup";
const COMMAND_MIGRATE = "migrate";

const arg = process.argv[3] ?? COMMAND_MIGRATE;

switch (arg) {
    case COMMAND_SETUP:
        executeSetupCommand();
        break;
    case COMMAND_MIGRATE:
        executeMigrationCommand();
        break;
}
