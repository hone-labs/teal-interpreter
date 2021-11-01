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

    const lines = tealCode.split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
    const instructions = lines.map(parseLine);
        
    return {
        instructions: instructions,
    };
}

//
// Parses a line of TEAL code.
//
function parseLine(line: string)  {
    const commentStartIndex = line.indexOf("#");
    if (commentStartIndex !== -1) {
        line = line.substring(0, commentStartIndex);
    }
    const parts = line.split(" ")
        .filter(part => part.length > 0);
    const opcode = parts.shift()!;
    const instruction: IInstruction = {
        opcode: opcode,
        operands: parts,
    };         
    return instruction;
}
