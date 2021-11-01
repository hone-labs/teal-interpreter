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
        switch (instruction.opcode) {
            case "int": {
                const value = parseInt(instruction.operands[0]);
                result.stack.push(BigInt(value));
                break;
            }

            case "pop": {
                result.stack.pop();
                break;
            }

            case "+": {
                const a = result.stack.pop() as bigint;
                const b = result.stack.pop() as bigint;
                result.stack.push(a + b);
                break;
            }

            default: {
                throw new Error(`Unexpected opcode "${instruction.opcode}""`);
            }
        }
    }
 

    return result;
}