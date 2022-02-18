import { IExecutionContext, ITealInterpreterConfig, TealInterpreter } from "..";

//
// Executes TEAL code and returns a result.
//
export async function execute(tealCode: string, config?: ITealInterpreterConfig): Promise<IExecutionContext> {

    const interpreter = new TealInterpreter();
    interpreter.load(tealCode, config);

    while (await interpreter.step()) {
        // Step until done.
    }

    return interpreter.context;
}