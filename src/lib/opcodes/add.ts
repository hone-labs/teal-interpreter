import { IExecuteResult } from "../..";
import { IToken } from "../../token";
import { IOpcode } from "../../opcode";


export class Add implements IOpcode {
    
    //
    // The instruction that contains the opcode.
    //
    private instruction: IToken;

    constructor(instruction: IToken) {
        this.instruction = instruction;
    }
    
    validateOperand(): void {
        if (this.instruction.operands.length !== 0) {
            throw new Error(`Opcode + expects 0 operands.`);
        }
    }
    
    validateContext(context: IExecuteResult): void {
        if (context.stack.length < 2) {
            throw new Error(`Expect two arguments on the stack, found only ${context.stack.length} values on the stack.`);
        }
    }
    
    execute(context: IExecuteResult): void {
        const a = context.stack.pop() as bigint;
        const b = context.stack.pop() as bigint;
        context.stack.push(a + b);
    }
}
