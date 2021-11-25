import { ITealInterpreterConfig } from "./config";
import { IExecutionContext, loadContext } from "./context";
import { IOpcode } from "./opcode";
import { parse } from "./parser";

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
    // Instructions loaded in the TEAL interpreter.
    //
    private _instructions: IOpcode[] = [];

    //
    // The context for execution of TEAL code.
    //
    private _context: IExecutionContext = {
        version: 1,
        curInstructionIndex: 0,
        appGlobals: {},
        assetParams: {},
        appParams: {},
        accounts: {},
        branchTargets: {},
        callstack: [],
        stack: [],
        args: [],
        txn: {},
        gtxn: [],
        txnSideEffects: {},
        gaid: {},
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
        return this.context.curInstructionIndex;
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
        this._context = loadContext(parseResult.branchTargets, config);
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
            this.context.curInstructionIndex = nextInstructionIndex;
        }
        else {
            // Move to next instruction.
            this.context.curInstructionIndex += 1;
        }

        return !this.context.finished;
    }
}