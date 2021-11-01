import { IExecutionContext, StackEntry } from "./context";
import { parse } from "./parser";

//
// Results of executing TEAL code.
//
export interface IExecuteResult {
    
    //
    // The version of the TEAL executed.
    //
    readonly version: number;

    //
    // The compute stack remaining when execution has finished.
    //
    readonly stack: StackEntry[];
}

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