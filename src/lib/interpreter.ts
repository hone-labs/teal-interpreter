import { Writable } from "stream";
import { ITealInterpreterConfig } from "./config";
import { IExecutionContext, ExecutionContext } from "./context";
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
    // Set breakpoints at the specified line numbers.
    // Clears previously set breakpoints.
    //
    setBreakpoints(lines: number[]): void;

    //
    // Loads TEAL code into the interpreter.
    //
    load(tealCode: string, config?: ITealInterpreterConfig): void;

    //
    // Returns true if the program has run to completion.
    //
    isFinished(): boolean;

    //
    // Step to the next instruction.
    // Returns true if able to step again, returns false when execution is done.
    //
    step(): Promise<boolean>;

    //
    // Continue running until program ends or we hit a breakpoint.
    // Returns true if able to continue again, returns false when execution is done.
    //
    continue(): Promise<boolean>;

    //
    // Runs the loaded TEAL code to completion.
    //
    run(): Promise<void>;

    //
    // Prints code coverage.
    //
    printCodeCoverage(outputStream: Writable): void;

}

export class TealInterpreter implements ITealInterpreter {

    //
    // Instructions loaded in the TEAL interpreter.
    //
    private _instructions: IOpcode[] = [];

    //
    // The context for execution of TEAL code.
    //
    private _context: IExecutionContext = new ExecutionContext({}, {});
    
    // 
    // Break points that have been set.
    // The "continue" function stop executing when it hits a break point.
    //
    private breakpointLines: number[] = [];

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
    // Set breakpoints at the specified line numbers.
    // Clears previously set breakpoints.
    //
    setBreakpoints(lines: number[]): void {
        this.breakpointLines = lines.slice(); // Copy the array so it can't be modified.
    }
    
    //
    // Loads TEAL code into the interpreter.
    //
    load(tealCode: string, config?: ITealInterpreterConfig): void {
        const parseResult = parse(tealCode);
        this._instructions = parseResult.instructions;
        this._context = new ExecutionContext(parseResult.branchTargets, config);
    }

    //
    // Returns true if the program has run to completion.
    //
    isFinished(): boolean {
        return this.context.finished 
            || this.curInstructionIndex > this.instructions.length - 1;
    }

    //
    // Step to the next instruction.
    // Returns true if able to continue.
    //
    async step(): Promise<boolean> {

        if (this.isFinished()) {
            //
            // Don't step beyond the end, terminates execution.
            //
            return false;
        }

        const instruction = this.instructions[this.curInstructionIndex];
        instruction.validateContext(this.context);
        let result = instruction.execute(this.context);
        instruction.markExecuted();

        if (result !== undefined) {
            if (typeof(result) !== "number") {
                result = await result; // Assume its a promise for a result.
            }

            if (result !== undefined) {
                // Branch to target instruction.
                this.context.curInstructionIndex = result;
                return !this.context.finished;
            }
        }

        // Move to next instruction.
        this.context.curInstructionIndex += 1;
        return !this.context.finished;
    }

    //
    // Continue running until program ends or we hit a breakpoint.
    //
    async continue(): Promise<boolean> {
        while (await this.step()) {
            // Continue until we need to stop.
            const curLineNo = this.getCurLineNo();
            if (curLineNo !== undefined) {
                if (this.breakpointLines.includes(curLineNo)) {
                    // Stop on breakpoint, but don't terminate execution.
                    return true; 
                }            
            }
        }

        // Program ended, terminates execution.
        return false;
    }

    //
    // Runs the loaded TEAL code to completion.
    //
    async run(): Promise<void> {
        while (await this.step()) {
            // Step until done.
        }
    }

    //
    // Prints code coverage.
    //
    printCodeCoverage(outputStream: Writable = process.stdout): void {
        outputStream.write(`==== CODE COVERAGE ====\r\n`);

        let maxLine = 1;

        //
        // Organise instructions for lookup by line number.
        //

        const instructionsByLine: { [index: number]: IOpcode } = {};
        for (const instruction of this.instructions) {
            instructionsByLine[instruction.getLineNo()] = instruction;
            maxLine = Math.max(maxLine, instruction.getLineNo());
        }

        const branchesByLine: { [index: number]: string } = {};

        for (const branchTarget of Object.entries(this.context.branchTargets)) {
            const labelName = branchTarget[0];
            const branchTargetLine = branchTarget[1].branchLineNo
            branchesByLine[branchTargetLine] = labelName;
            maxLine = Math.max(maxLine, branchTargetLine);
        }

        let blankLineCount = 0;

        for (let line = 1; line <= maxLine; ++line) {

            const linePrefix = `${line}: `.padEnd(4);
            let outputLine = linePrefix;
            let showLine = false;

            const nextInstruction = instructionsByLine[line+1];

            const branch = branchesByLine[line];
            if (branch) {

                //
                // There is a branch at this line.
                // Only need to show it if the next instruction has coverage.
                //
                if (nextInstruction && nextInstruction.getExecutionCount() > 0) {
                    showLine = true;
                    outputLine += `${branch}: `;
                }
            }

            const instruction = instructionsByLine[line]; 
            if (instruction) {                
                //
                // There is an instruction at this line.
                //
                const token = instruction.getToken();
                const line = `${token.opcode} ${token.operands.join(' ')}`;
                outputLine += `${line.padEnd(35)} `;

                if (instruction.getExecutionCount() > 0) {
                    showLine = true;
                    outputLine += `(x${instruction.getExecutionCount()})`;
                }
            }

            if (showLine) {
                outputStream.write(outputLine);
                outputStream.write(`\r\n`);
                blankLineCount = 0;
            }
            else {
                if (blankLineCount < 1) {
                    outputStream.write(outputLine);
                    outputStream.write(`\r\n`);
                }
                else if (blankLineCount === 1) {
                    outputStream.write(`...\r\n`);
                }
                blankLineCount += 1;
            }
        }
    }
}