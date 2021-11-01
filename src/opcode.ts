import { IExecuteResult } from ".";
import { IToken } from "./token";

//
// Represents validation and execution for an opcode.
//
export interface IOpcode {

    //
    // Validates the operands for the opcode.
    //
    validateOperand(): void;

    //
    // Validate the opcode against the current context.
    //    
    validateContext(context: IExecuteResult): void;

    //
    // Executes the opcode.
    //
    execute(context: IExecuteResult): void;
}

//
// Abstract base class for opcodes.
//
export abstract class Opcode implements IOpcode {

    //
    // The instruction that contains the opcode.
    //
    protected readonly token: IToken;

    //
    // The number of operands expected by the opcode.
    //
    private numOperands: number;

    //
    // The number of stack based arguments expected by this opcode.
    //
    private numStackArgs: number;

    constructor(token: IToken, numOperands: number, numStackArgs: number) {
        this.token = token;
        this.numOperands = numOperands;
        this.numStackArgs = numStackArgs;
    }

    validateOperand(): void {
        if (this.token.operands.length !== this.numOperands) {
            throw new Error(`Opcode ${this.token.opcode} expects ${this.numOperands} operands, instead found ${this.token.operands.length} operands.`);
        }
    }

    validateContext(context: IExecuteResult): void {
        if (context.stack.length < this.numStackArgs) {
            throw new Error(`Expected ${this.numStackArgs} stack-based arguments on the stack for opcode ${this.token.opcode}, found only ${context.stack.length} values on the stack.`);
        }
    }

    abstract execute(context: IExecuteResult): void;

}
