import * as minimist from "minimist";
import { execute, ITealInterpreterConfig } from ".";
import * as fs from "fs-extra";

async function main(): Promise<void> {
    const argv = minimist(process.argv.slice(2));
    if (argv._.length === 0) {
        console.log(`Usage: teal <teal-file>`);
        process.exit(1);
    }

    const tealFilePath = argv._[0];
    const configFilePath = tealFilePath + ".json";
    const configExists = await fs.pathExists(configFilePath);
    let config: ITealInterpreterConfig = {};

    if (configExists) {
        console.log(`Loading config: ${configFilePath}`);

        config = JSON.parse(await fs.readFile(configFilePath, "utf8"));
    }

    config.showCodeCoverage = !!argv["code-coverage"];

    const tealCode = await fs.readFile(tealFilePath, "utf8");
    const result = await execute(tealCode, config);

    console.log(`== RESULT ==`);
    console.log(`Stack:`);
    console.log(result.stack);
}

main()
    .catch(err => {
        console.error(`Failed:`);
        console.error(err && err.stack || err);
    });