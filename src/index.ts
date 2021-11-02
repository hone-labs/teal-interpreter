import { IExecutionContext } from "./lib/context";
import { IOpcode } from "./lib/opcode";
import { parse } from "./lib/parser";

export { parse, IParseResult } from "./lib/parser";
export { IOpcode } from "./lib/opcode";
export { execute  } from "./lib/execute";
export { IExecuteResult } from "./lib/execute-result";
export { StackEntry } from "./lib/context";

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
    load(tealCode: string): void;

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
        stack: [],
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
    load(tealCode: string): void {
        this._instructions = parse(tealCode).instructions;
        this._context = {
            version: 1,
            stack: [],
        };
        this._curInstructionIndex = 0;
    }

    //
    // Step to the next instruction.
    // Returns true if able to continue.
    //
    step(): boolean {
        if (this.curInstructionIndex > this.instructions.length - 1) {
            //
            // Don't step beyond the end.
            //
            return false;
        }

        const instruction = this.instructions[this.curInstructionIndex];
        instruction.execute(this.context);
        this._curInstructionIndex += 1;
        return true;

    }
}