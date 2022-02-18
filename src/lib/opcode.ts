import { constants } from "./constants";
import { IExecutionContext, makeBigInt, makeBytes } from "./context";
import { IExecuteResult } from "./execute-result";
import { IOpcodeDef } from "./opcodes";
import { IToken } from "./token";

//
// Represents validation and execution for an opcode.
//
export interface IOpcode {

    //
    // Gets the line number of the TEAL code where the opcode was loaded.
    //
    getLineNo(): number;

    //
    // Validates the operands for the opcode.
    //
    validateOperand(): void;

    //
    // Validate the opcode against the current context.
    // This is invoked right before this particular opcode is executed.
    //    
    validateContext(context: IExecuteResult): void;

    //
    // Executes the opcode.
    // Branches can return the offset of an instruction to jump to.
    //
    execute(context: IExecutionContext): number | void | Promise<number | void>;
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
    // Defines the details of the opcode.
    //
    protected opcodeDef: IOpcodeDef;

    constructor(token: IToken, opcodeDef: IOpcodeDef) {
        this.token = token;
        this.opcodeDef = opcodeDef;
    }

    //
    // Gets the line number of the TEAL code where the opcode was loaded.
    //
    getLineNo(): number {
        return this.token.lineNo;
    }

    validateOperand(): void {

        if (this.opcodeDef.operands !== undefined) {
            if (Array.isArray(this.opcodeDef.operands)) {
                for (const numOperands of this.opcodeDef.operands) {
                    if (this.token.operands.length === numOperands) {
                        // Ok, meets one of the expected number of operands.
                        return;
                    }
                }
    
                throw new Error(`${this.token.lineNo} - Opcode ${this.token.opcode} expects a number of operands equal to one of ${this.opcodeDef.operands.join(", ")}, instead found ${this.token.operands.length} operands.`);
            }
            else {
                if (this.token.operands.length !== this.opcodeDef.operands) {
                    throw new Error(`${this.token.lineNo} - Opcode ${this.token.opcode} expects ${this.opcodeDef.operands} operands, instead found ${this.token.operands.length} operands.`);
                }
            }
        }
    }

    validateContext(context: IExecuteResult): void {
        if (this.opcodeDef.stack !== undefined) {
            if (context.stack.length < this.opcodeDef.stack) {
                throw new Error(`${this.token.lineNo} - Expected ${this.opcodeDef.stack} stack-based arguments on the stack for opcode ${this.token.opcode}, found only ${context.stack.length} values on the stack.`);
            }
        }
    }

    abstract execute(context: IExecutionContext): number | void | Promise<number | void>;

    //
    // Parses an int from an operand.
    //
    protected parseIntOperand(operandIndex: number): bigint {
        if (operandIndex > this.token.operands.length - 1) {
            throw new Error(`${this.token.lineNo} - Operand ${operandIndex} not found. Only ${this.token.operands.length} operands supplied to opcode ${this.token.opcode}.`)
        }

        const operand = this.token.operands[operandIndex];
        const constantValue = constants[operand];
        if (constantValue !== undefined) {
            return BigInt(constantValue);
        }

        return BigInt(operand);
    }

    //
    // Pops an integer argument from the stack.
    //
    protected popInt(context: IExecutionContext): bigint {
        if (context.stack.length === 0) {
            throw new Error(`${this.token.lineNo} - Want to pop uint64 from stack, but there is nothing on the stack!`);
        }

        const value = context.stack.pop()!;
        if (value.type !== "bigint") {
            throw new Error(`${this.token.lineNo} - Expected to pop uint64 from stack, instead found ${value.type}.`);
        }

        return value.value as bigint;
    }

    //
    // Pushes an int on the stakc.
    //
    protected pushInt(context: IExecuteResult, value: bigint): void {
        context.stack.push(makeBigInt(value, value));
    }

    //
    // Pops a byte array from the stack.
    //
    protected popBytes(context: IExecutionContext): Uint8Array {
        if (context.stack.length === 0) {
            throw new Error(`${this.token.lineNo} - Want to pop byte[] from stack, but there is nothing on the stack!`);
        }

        const value = context.stack.pop()!;
        if (value.type !== "byte[]") {
            throw new Error(`${this.token.lineNo} - Expected to pop byte[] from stack, instead found ${value.type}.`);
        }

        return value.value as Uint8Array;
    }

    //
    // Pushes a byte array on the stack.
    //
    protected pushBytes(context: IExecuteResult, value: Uint8Array): void {
        context.stack.push(makeBytes(value));
    }
}
