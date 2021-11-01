
import { IToken } from "./token";

//
// Tokenizes TEAL code and returns an intermediate format.
//
export function tokenize(tealCode: string): IToken[] {

    const lines = tealCode.split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
    const instructions = lines.map(parseLine);
    return instructions;
}

//
// Parses a line of TEAL code.
//
function parseLine(line: string)  {
    if (!line.startsWith("#pragma")) {
        const commentStartIndex = line.indexOf("#");
        if (commentStartIndex !== -1) {
            line = line.substring(0, commentStartIndex);
        }
    }
    const parts = line.split(" ")
        .filter(part => part.length > 0);
    const opcode = parts.shift()!;
    const instruction: IToken = {
        opcode: opcode,
        operands: parts,
    };         
    return instruction;
}
