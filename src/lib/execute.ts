import { IExecutionContext, StackEntry } from "./context";
import { IExecuteResult } from "./execute-result";
import { parse } from "./parser";

//
// Executes TEAL code and returns a result.
//
export function execute(tealCode: string): IExecuteResult {
    
    const parseResult = parse(tealCode);
    const context: IExecutionContext = {
        version: 1,
        branchTargets: parseResult.branchTargets,
        stack: [],
    };


    let curInstructionIndex = 0;
    while (curInstructionIndex < parseResult.instructions.length) {
        const instruction = parseResult.instructions[curInstructionIndex];
        instruction.validateContext(context);
        const nextInstructionIndex = instruction.execute(context);
        if (nextInstructionIndex !== undefined) {
            // Branch to target instruction.
            curInstructionIndex = nextInstructionIndex;
        }
        else {
            // Move to next instruction.
            curInstructionIndex += 1;
        }
    }
 
    return context;
}