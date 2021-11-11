import { IAccountMap, IExecutionContext, ITypedValue, makeBigInt } from "./context";
import { loadValueMap, loadValues } from "./convert";
import { IOpcode } from "./opcode";
import { parse } from "./parser";

//
// Unencoded value for an argument.
//
export interface IValueDef {

    //
    // The type of the value.
    //
    readonly type: "array" | "int" | "string" | "addr";

    //
    // The value of the value.
    //
    readonly value: any;
}

//
// Extended value definition.
//
export type ValueDef = bigint | number | string | IValueDef;

//
// A lookup table for values defs.
//
export interface IValueDefMap {
    [index: string]: ValueDef;
}


//
// Specifies initial configuration for TEAL code execution.
//
export interface ITealInterpreterConfig {

    //
    // Accounts that can be accessed from TEAL code.
    //
    accounts?: IAccountMap;

    //
    // Global values.
    //
    globals?: IValueDefMap;
    
    //
    // The current transaction.
    //
    txn?: IValueDefMap;

    //
    // The current transaction group.
    //
    txns?: IValueDefMap[];

    //
    // Array of arguments.
    //
    readonly args?: ValueDef[];

}

export interface ITealInterpreter {

    //
    // Index of the instruction we are currently stopped at
    //
    readonly curInstructionIndex: number;

    //
    // Instructions loaded in the TEAL interpreter.
    //
    readonly instructions: IOpcode[];

    //
    // The context for execution of TEAL code.
    //
    readonly context: IExecutionContext;

    //
    // Gets the line number of the current instruction.
    // Returns undefined
    //
    getCurLineNo(): number | undefined;

    //
    // Loads TEAL code into the interpreter.
    //
    load(tealCode: string, config?: ITealInterpreterConfig): void;

    //
    // Step to the next instruction.
    // Returns true if able to continue.
    //
    step(): boolean;
}

export class TealInterpreter implements ITealInterpreter {

    //
    // Index of the instruction we are currently stopped at
    //
    private _curInstructionIndex: number = 0;

    //
    // Instructions loaded in the TEAL interpreter.
    //
    private _instructions: IOpcode[] = [];

    //
    // The context for execution of TEAL code.
    //
    private _context: IExecutionContext = {
        version: 1,
        accounts: {},
        branchTargets: {},
        stack: [],
        args: [],
        txn: {},
        txns: [],
        globals: {},
        scratch: [],
        intcblock: [],
        bytecblock: [],
        finished: false,
    };

    //
    // Index of the instruction we are currently stopped at
    //
    get curInstructionIndex(): number {
        return this._curInstructionIndex;
    }

    //
    // Instructions loaded in the TEAL interpreter.
    //
    get instructions(): IOpcode[] {
        return this._instructions;
    }

    //
    // The context for execution of TEAL code.
    //
    get context(): IExecutionContext {
        return this._context;
    }

    //
    // Gets the line number of the current instruction.
    //
    getCurLineNo(): number | undefined {
        if (this.curInstructionIndex >= 0 && 
            this.curInstructionIndex < this.instructions.length) {
            return this.instructions[this.curInstructionIndex].getLineNo();
        }
        else {
            return undefined;
        }
    }
    
    //
    // Loads TEAL code into the interpreter.
    //
    load(tealCode: string, config?: ITealInterpreterConfig): void {
        const parseResult = parse(tealCode);
        this._instructions = parseResult.instructions;
        this._context = {
            version: 1,
            accounts: config?.accounts || {},
            branchTargets: parseResult.branchTargets,
            stack: [],
            args: config?.args !== undefined ? loadValues(config.args) : [],
            txn: config?.txn ? loadValueMap(config.txn) : {},
            txns: config?.txns ? config.txns.map(loadValueMap) : [],
            globals: config?.globals ? loadValueMap(config.globals) : {},
            scratch: new Array<ITypedValue>(255).fill(makeBigInt(BigInt(0))),
            intcblock: [],
            bytecblock: [],
            finished: false,
        };
        this._curInstructionIndex = 0;
    }

    //
    // Step to the next instruction.
    // Returns true if able to continue.
    //
    step(): boolean {
        if (this.context.finished 
            || this.curInstructionIndex > this.instructions.length - 1) {
            //
            // Don't step beyond the end.
            //
            return false;
        }

        const instruction = this.instructions[this.curInstructionIndex];
        instruction.validateContext(this.context);
        const nextInstructionIndex = instruction.execute(this.context);
        if (nextInstructionIndex !== undefined) {
            // Branch to target instruction.
            this._curInstructionIndex = nextInstructionIndex;
        }
        else {
            // Move to next instruction.
            this._curInstructionIndex += 1;
        }

        return !this.context.finished;
    }
}