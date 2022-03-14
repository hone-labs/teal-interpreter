import { constants } from "./constants";
import { IExecutionContext, makeBigInt, makeBytes } from "./context";
import { IOpcodeDef } from "./opcodes";
import { IToken } from "./token";
import { stringify } from "./utils";

//
// Represents validation and execution for an opcode.
//
export interface IOpcode {

    //
    // Gets the token for this opcode.
    //
    getToken(): IToken;
    
    //
    // Marks the opcode as having been executed.
    //
    markExecuted(): void;

    //
    // Gets the execution count for this opcode.
    //
    getExecutionCount(): number;

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
    validateContext(context: IExecutionContext): void;

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

    //
    // Counts the number of times this instruction has been executed.
    //
    private executionCount = 0;

    constructor(token: IToken, opcodeDef: IOpcodeDef) {
        this.token = token;
        this.opcodeDef = opcodeDef;
    }

    //
    // Gets the token for this opcode.
    //
    getToken(): IToken {
        return this.token;
    }

    //
    // Marks the opcode as having been executed.
    //
    markExecuted(): void {
        this.executionCount += 1;
    }

    //
    // Gets the execution count for this opcode.
    //
    getExecutionCount(): number {
        return this.executionCount;
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

    validateContext(context: IExecutionContext): void {
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

        const top = context.stack[context.stack.length - 1];
        if (top.type !== "bigint") {
            throw new Error(`${this.token.lineNo} - Expected to pop uint64 from stack, instead found ${top.type}.\r\nStack:\r\n${stringify(context.stack)}`);
        }

        const value = context.stack.pop()!;
        return value.value as bigint;
    }

    //
    // Pushes an int on the stakc.
    //
    protected pushInt(context: IExecutionContext, value: bigint): void {
        context.stack.push(makeBigInt(value, value));
    }

    //
    // Pops a byte array from the stack.
    //
    protected popBytes(context: IExecutionContext): Uint8Array {
        if (context.stack.length === 0) {
            throw new Error(`${this.token.lineNo} - Want to pop byte[] from stack, but there is nothing on the stack!`);
        }

        const top = context.stack[context.stack.length - 1];
        if (top.type !== "byte[]") {
            throw new Error(`${this.token.lineNo} - Expected to pop byte[] from stack, instead found ${top.type}.\r\nStack:\r\n${stringify(context.stack)}`);
        }

        const value = context.stack.pop()!;
        return value.value as Uint8Array;
    }

    //
    // Pushes a byte array on the stack.
    //
    protected pushBytes(context: IExecutionContext, value: Uint8Array): void {
        context.stack.push(makeBytes(value));
    }


    //
    // Pops bytes from the stack converts them to a int (possibly bigger than a 64 bit int).
    //
    protected bytesToInt(bytes: Uint8Array): bigint {
        if (bytes.length === 0) { 
            return BigInt(0);
        }

        const hex = Array.from(bytes).map(value => {
            let hex = value.toString(16);
            if (hex.length % 2) { 
                hex = '0' + hex;
            } 
            return hex;
        });

        return BigInt('0x' + hex.join(''));
    }

    //
    // Converts an int to bytes and pushes it on the stack.
    //
    protected intToBytes(value: bigint): Uint8Array {
        if (value === BigInt(0)) {
            return new Uint8Array([]);
        };

        let hex = value.toString(16);
        if (hex.length % 2) { 
            hex = '0' + hex;            
        } 

        const length = hex.length / 2;
        const array = new Uint8Array(length);

        for (let i = 0, j = 0; i < length; i += 1, j += 2) {
            array[i] = parseInt(hex.slice(j, j + 2), 16);
        }
    
        return array;
    }
    
    //
    // Converts an int to bytes and pushes it on the stack.
    //
    protected pushIntAsBytes(context: IExecutionContext, value: bigint): void {
        this.pushBytes(context, this.intToBytes(value));
    }
}
