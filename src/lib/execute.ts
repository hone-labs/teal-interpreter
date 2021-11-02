import { TealInterpreter } from "..";
import { IExecuteResult } from "./execute-result";

//
// Executes TEAL code and returns a result.
//
export function execute(tealCode: string): IExecuteResult {

    const interpreter = new TealInterpreter();
    interpreter.load(tealCode);

    while (interpreter.step()) {
        // Step until done.
    }

    return interpreter.context;
}