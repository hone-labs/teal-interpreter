import { IToken } from "./token";
import { Add } from "./opcodes/add";
import { Int } from "./opcodes/int";
import { Pop } from "./opcodes/pop";
import { IOpcode } from "./opcode";
import { VersionPragma } from "./opcodes/version-pragma";
import { Branch } from "./opcodes/branch";
import { Err } from "./opcodes/Err";
import { Sha256 } from "./opcodes/sha256";
import { Arg } from "./opcodes/Arg";
import { Txn } from "./opcodes/txn";
import { Global } from "./opcodes/global";
import { Load } from "./opcodes/load";
import { Store } from "./opcodes/store";
import { Len } from "./opcodes/len";

//
// The static definiton of an opcode.
//
export interface IOpcodeDef {
    //
    // The version of TEAL that adds the opcode.
    //
    readonly version: number,

    //
    // Factory function to create an instance of the opcode.
    //
    readonly factory: (token: IToken) => IOpcode,
}

//
// A look up table for opcode handlers.
//
export interface IOpcodeMap {
    [index: string]: IOpcodeDef;
}

//
// A look up table for opcode constructors.
//
export const opcodeDefs: IOpcodeMap = {
    
    // TEAL 1
    "#pragma": {
        version: 1,
        factory: token => new VersionPragma(token),
    },
    "err":  {
        version: 1,
        factory: token => new Err(token),
    },
    "sha256":  {
        version: 1,
        factory: token => new Sha256(token),
    },
    "int":  {
        version: 1,
        factory: token => new Int(token),
    },
    "pop": {
        version: 1,
        factory: token => new Pop(token),
    },
    "+": {
        version: 1,
        factory: token => new Add(token),
    },
    "len": {
        version: 1,
        factory: token => new Len(token),
    },
    "arg": {
        version: 1,
        factory: token => new Arg(token),
    },
    "txn": {
        version: 1,
        factory: token => new Txn(token),
    },
    "global": {
        version: 1,
        factory: token => new Global(token),
    },
    "load": {
        version: 1,
        factory: token => new Load(token),
    },
    "store": {
        version: 1,
        factory: token => new Store(token),
    },

    // TEAL 2
    "b": {
        version: 2,
        factory: token => new Branch(token),
    },

    // TEAL 4

    "sqrt": {
        version: 4,
        factory: token => new Add(token),
    },
}