
import { IExecuteResult } from "../..";
import { IToken } from "../../token";
import { IOpcode } from "../../opcode";

export class Pop implements IOpcode {
    
    //
    // The instruction that contains the opcode.
    //
    private instruction: IToken;

    //
    // The integer literal value parsed from operands.
    //
    private value?: number;

    constructor(instruction: IToken) {
        this.instruction = instruction;
    }
    
    validateOperand(): void {
        if (this.instruction.operands.length !== 0) {
            throw new Error(`Opcode "pop" expects 0 operands.`);
        }
    }
    
    validateContext(context: IExecuteResult): void {
        if (context.stack.length < 1) {
            throw new Error(`Expected 1 arguments on the stack, found only 0 values on the stack.`);
        }
    }
    
    execute(context: IExecuteResult): void {
        context.stack.pop();
    }
}
