import { IExecuteResult, IInstruction } from ".";
//
// Represents validation and execution for an object.
//
export interface IOpcode {

    //
    // Executes the opcode.
    //
    execute(context: IExecuteResult, instruction: IInstruction): void;
}

//
// A look up table for opcode handlers.
//
export interface IOpcodeMap {
    [index: string]: IOpcode;
}

//
// A look up table for opcode handlers.
//
export const opcodeHandlers: IOpcodeMap = {
    "int": {
        execute: (context, instruction) => {
            const value = parseInt(instruction.operands[0]);
            context.stack.push(BigInt(value));
        },
    },

    "pop": {
        execute: (context, instruction) => {
            context.stack.pop();
        },
    },

    "+": {
        execute: (context, instruction): void => {
            const a = context.stack.pop() as bigint;
            const b = context.stack.pop() as bigint;
            context.stack.push(a + b);
        },
    },

}