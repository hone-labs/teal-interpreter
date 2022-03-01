import { IOpcode } from "./opcode";
import { opcodeDefs } from "./opcodes";
import { tokenize } from "./tokenizer";

export interface IBranchTarget {
    //
    // The line number (1-based) where the label was parsed from.
    //
    branchLineNo: number;

    //
    // The index of the instruction that is being branched to.
    //
    targetInstructionIndex: number;
}

//
// Converts a branch target to an instruction index.
//
export interface IBranchTargetMap {
    [index: string]: IBranchTarget;
}

//
// Results of parsing TEAL code.
//
export interface IParseResult {
    //
    // Parsed instructions.
    //
    readonly instructions: IOpcode[];

    //
    // Converts a branch target to an instruction index.
    //
    readonly branchTargets: IBranchTargetMap;
}

//
// Parses TEAL code and returns an intermediate format.
//
export function parse(tealCode: string): IParseResult {

    const tokens = tokenize(tealCode);
    const instructions: IOpcode[] = [];
    const branchTargets: IBranchTargetMap = {};

    for (const token of tokens) {
        if (token.opcode.endsWith(":")) {
            // It's a label, create branch target.
            const labelName = token.opcode.substring(0, token.opcode.length-1);
            branchTargets[labelName] = {
                branchLineNo: token.lineNo,
                targetInstructionIndex: instructions.length,
            };
        }
        else {
            const opcodeDef = opcodeDefs[token.opcode];
            if (!opcodeDef) {
                throw new Error(`${token.lineNo} - Unrecognised opcode "${token.opcode}"`);
            }
            instructions.push(opcodeDef.factory(token));
        }
    }

    // 
    // Validate each operation.
    //
    for (const instruction of instructions) {
        instruction.validateOperand();
    }
        
    return {
        instructions: instructions,
        branchTargets: branchTargets
    };
}
