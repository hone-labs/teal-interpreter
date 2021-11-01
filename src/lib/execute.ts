import { IExecutionContext, StackEntry } from "./context";
import { IExecuteResult } from "./execute-result";
import { parse } from "./parser";

//
// Executes TEAL code and returns a result.
//
export function execute(tealCode: string): IExecuteResult {
    
    const result: IExecutionContext = {
        version: 1,
        stack: [],
    };

    const parseResult = parse(tealCode);

    for (const operation of parseResult.operations) {
        operation.validateContext(result);
        operation.execute(result);
    }
 
    return result;
}