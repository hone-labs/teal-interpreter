import { IToken } from "./token";
import { Add } from "./lib/opcodes/add";
import { Int } from "./lib/opcodes/int";
import { Pop } from "./lib/opcodes/pop";
import { IOpcode } from "./opcode";
import { VersionPragma } from "./lib/opcodes/version-pragma";

//
// A look up table for opcode handlers.
//
export interface IOpcodeMap {
    [index: string]: (instruction: IToken) => IOpcode;
}

//
// A look up table for opcode constructors.
//
export const opcodeConstructors: IOpcodeMap = {
    "#pragma": instruction => new VersionPragma(instruction),
    "int": instruction => new Int(instruction),
    "pop": instruction => new Pop(instruction),
    "+": instruction => new Add(instruction),
}