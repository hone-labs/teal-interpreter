import { IExecutionContext, ITealInterpreterConfig, TealInterpreter } from "..";

//
// Executes TEAL code and returns a result.
//
export async function execute(tealCode: string, config?: ITealInterpreterConfig): Promise<IExecutionContext> {

    const interpreter = new TealInterpreter();
    interpreter.load(tealCode);
    interpreter.configure(config);
    
    try {
        await interpreter.run();
    }
    finally {
        if (config?.showCodeCoverage) {
            interpreter.printCodeCoverage();
        }
    }

    return interpreter.context;
}