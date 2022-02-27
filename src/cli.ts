import * as minimist from "minimist";
import { execute, ITealInterpreterConfig } from ".";
import * as fs from "fs/promises";

async function main(): Promise<void> {
    const argv = minimist(process.argv.slice(2));
    if (argv._.length === 0) {
        console.log(`Usage: teali <teal-file>`);
        process.exit(1);
    }

    const config: ITealInterpreterConfig = {
        showCodeCoverage: !!argv["code-coverage"],
    };

    const tealFilePath = argv._[0];
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