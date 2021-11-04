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
import { Gtxn } from "./opcodes/gtxn";
import { Keccak256 } from "./opcodes/keccak256";
import { Sha512_256 } from "./opcodes/sha512_256";
import { Ed25519verify } from "./opcodes/ed25519verify";
import { Byte } from "./opcodes/byte";
import { Addr } from "./opcodes/addr";
import { Ecdsa_verify } from "./opcodes/ecdsa_verify";
import { Minus } from "./opcodes/minus";
import { Div } from "./opcodes/div";
import { Mul } from "./opcodes/mul";
import { Lt } from "./opcodes/lt";
import { Gt } from "./opcodes/gt";
import { Lte } from "./opcodes/lte";
import { Gte } from "./opcodes/gte";
import { And } from "./opcodes/and";
import { Or } from "./opcodes/or";
import { Eq } from "./opcodes/eq";
import { Ne } from "./opcodes/ne";
import { Not } from "./opcodes/not";
import { Itob } from "./opcodes/itob";
import { Btoi } from "./opcodes/btoi";
import { Mod } from "./opcodes/mod";

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
    "keccak256":  {
        version: 1,
        factory: token => new Keccak256(token),
    },
    "sha512_256":  {
        version: 1,
        factory: token => new Sha512_256(token),
    },
    "ed25519verify":  {
        version: 1,
        factory: token => new Ed25519verify(token),
    },
    "pop": {
        version: 1,
        factory: token => new Pop(token),
    },
    "+": {
        version: 1,
        factory: token => new Add(token),
    },
    "-": {
        version: 1,
        factory: token => new Minus(token),
    },
    "/": {
        version: 1,
        factory: token => new Div(token),
    },
    "*": {
        version: 1,
        factory: token => new Mul(token),
    },    
    "<": {
        version: 1,
        factory: token => new Lt(token),
    },    
    ">": {
        version: 1,
        factory: token => new Gt(token),
    },    
    "<=": {
        version: 1,
        factory: token => new Lte(token),
    },    
    ">=": {
        version: 1,
        factory: token => new Gte(token),
    },    
    "&&": {
        version: 1,
        factory: token => new And(token),
    },    
    "||": {
        version: 1,
        factory: token => new Or(token),
    },    
    "==": {
        version: 1,
        factory: token => new Eq(token),
    },    
    "!=": {
        version: 1,
        factory: token => new Ne(token),
    },    
    "!": {
        version: 1,
        factory: token => new Not(token),
    },    
    "len": {
        version: 1,
        factory: token => new Len(token),
    },
    "itob": {
        version: 1,
        factory: token => new Itob(token),
    },   
    "btoi": {
        version: 1,
        factory: token => new Btoi(token),
    },        
    "%": {
        version: 1,
        factory: token => new Mod(token),
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
    "gtxn": {
        version: 1,
        factory: token => new Gtxn(token),
    },
    "load": {
        version: 1,
        factory: token => new Load(token),
    },
    "store": {
        version: 1,
        factory: token => new Store(token),
    },

    // Pseudo opcodes
    "int":  {
        version: 1,
        factory: token => new Int(token),
    },
    "byte":  {
        version: 1,
        factory: token => new Byte(token),
    },
    "addr":  {
        version: 1,
        factory: token => new Addr(token),
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

    // TEAL 5
    "ecdsa_verify":  {
        version: 5,
        factory: token => new Ecdsa_verify(token),
    },

}