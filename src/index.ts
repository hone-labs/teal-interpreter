//
// Represents a parsed instruction.
//
export interface IInstruction {

    //
    // The opcode for the instruction.
    //
    opcode: string;

    //
    // Operands for the instruction.
    //
    operands: string[]

}

//
// Results of parsing TEAL code.
//
export interface IParseResult {
    //
    // Parsed instructions.
    //
    readonly instructions: IInstruction[];
}

//
// Parses TEAL code and returns an intermediate format.
//
export function parse(tealCode: string): IParseResult {
    const parts = tealCode.split(" ")
        .filter(part => part.length > 0);
    if (parts.length === 0) {
    return {
            instructions: [],
        };
    }
    
    const opcode = parts.shift()!;
    const instruction: IInstruction = {
        opcode: opcode,
        operands: parts,
    };

    return {
        instructions: [
            instruction
        ],
    };
}

//
// An entry in the AVM compute stack.
//
export type StackEntry = bigint | Uint8Array;

//
// Results of executing TEAL code.
//
export interface IExecuteResult {
    //
    // The compute stack remaining when execution has finished.
    //
    readonly stack: StackEntry[];
}

//
// Executes TEAL code and returns a result.
//
export function execute(tealCode: string): IExecuteResult {
    
    const result: IExecuteResult = {
        stack: [],
    };

    const parseResult = parse(tealCode);

    for (const instruction of parseResult.instructions) {
        switch (instruction.opcode) {
            case "int": {
                const value = parseInt(instruction.operands[0]);
                result.stack.push(BigInt(value));
                break;
            }
        }
    }
 

    return result;
}