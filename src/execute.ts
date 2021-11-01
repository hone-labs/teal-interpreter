import { opcodeHandlers } from "./opcodes";
import { parse } from "./parser";

//
// An entry in the AVM compute stack.
//
export type StackEntry = bigint | Uint8Array;

//
// Results of executing TEAL code.
//
export interface IExecuteResult {
    //
    // The compute stack remaining when execution has finished.
    //
    readonly stack: StackEntry[];
}

//
// Executes TEAL code and returns a result.
//
export function execute(tealCode: string): IExecuteResult {
    
    const result: IExecuteResult = {
        stack: [],
    };

    const parseResult = parse(tealCode);

    for (const instruction of parseResult.instructions) {

        const handler = opcodeHandlers[instruction.opcode];
        if (!handler) {
            throw new Error(`Unexpected opcode "${instruction.opcode}"`);
        }

        handler.execute(result, instruction);
    }
 

    return result;
}