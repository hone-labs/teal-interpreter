import { IExecuteResult, IInstruction } from ".";

export const opcodeHandlers: any = {
    "int": {
        execute: (context: IExecuteResult, instruction: IInstruction): void => {
            const value = parseInt(instruction.operands[0]);
            context.stack.push(BigInt(value));
        },
    },

    "pop": {
        execute: (context: IExecuteResult, instruction: IInstruction): void => {
            context.stack.pop();
        },
    },

    "+": {
        execute: (context: IExecuteResult, instruction: IInstruction): void => {
            const a = context.stack.pop() as bigint;
            const b = context.stack.pop() as bigint;
            context.stack.push(a + b);
        },
    },

}