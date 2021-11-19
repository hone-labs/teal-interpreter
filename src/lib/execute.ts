import { ITealInterpreterConfig, TealInterpreter } from "..";
import { IExecuteResult } from "./execute-result";

//
// Executes TEAL code and returns a result.
//
export function execute(tealCode: string, config?: ITealInterpreterConfig): IExecuteResult {

    const interpreter = new TealInterpreter();
    interpreter.load(tealCode, config);

    while (interpreter.step()) {
        // Step until done.
    }

    return interpreter.context;
}