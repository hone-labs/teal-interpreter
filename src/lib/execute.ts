import { ITealInterpreterConfig, TealInterpreter } from "..";
import { IExecuteResult } from "./execute-result";

//
// Executes TEAL code and returns a result.
//
export async function execute(tealCode: string, config?: ITealInterpreterConfig): Promise<IExecuteResult> {

    const interpreter = new TealInterpreter();
    interpreter.load(tealCode, config);

    while (await interpreter.step()) {
        // Step until done.
    }

    return interpreter.context;
}