//
// Represents a parsed instruction.
//
export interface IToken {

    //
    // The line number the token was parsed from.
    //
    lineNo: number;

    //
    // The opcode for the instruction.
    //
    opcode: string;

    //
    // Operands for the instruction.
    //
    operands: string[]

}
