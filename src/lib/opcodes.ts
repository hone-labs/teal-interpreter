import { IToken } from "./token";
import { Add } from "./opcodes/add";
import { Int } from "./opcodes/int";
import { Pop } from "./opcodes/pop";
import { IOpcode } from "./opcode";
import { VersionPragma } from "./opcodes/version-pragma";
import { Branch } from "./opcodes/branch";
import { Err } from "./opcodes/err";
import { Sha256 } from "./opcodes/sha256";
import { Arg } from "./opcodes/arg";
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
import { Bor } from "./opcodes/bor";
import { Band } from "./opcodes/band";
import { Xor } from "./opcodes/xor";
import { Complement } from "./opcodes/complement";
import { Mulw } from "./opcodes/mulw";
import { Intcblock } from "./opcodes/intcblock";
import { Intc } from "./opcodes/intc";
import { Intc_X } from "./opcodes/intc_X";
import { Bytecblock } from "./opcodes/bytecblock";
import { Bytec } from "./opcodes/bytec";
import { Bytec_X } from "./opcodes/bytec_X";
import { Arg_X } from "./opcodes/arg_X";
import { Bnz } from "./opcodes/bnz";
import { Dup } from "./opcodes/dup";
import { Assert } from "./opcodes/assert";
import { Sqrt } from "./opcodes/sqrt";
import { Addw } from "./opcodes/addw";
import { Txna } from "./opcodes/txna";
import { Gtxna } from "./opcodes/gtxna";
import { Bz } from "./opcodes/bz";
import { Return } from "./opcodes/return";
import { Dup2 } from "./opcodes/dup2";
import { Concat } from "./opcodes/concat";
import { Substring } from "./opcodes/substring";
import { Substring3 } from "./opcodes/substring3";
import { Balance } from "./opcodes/balance";
import { AppLocalGet } from "./opcodes/app_local_get";
import { AppLocalPut } from "./opcodes/app_local_put";
import { AppGlobalGet } from "./opcodes/app_global_get";
import { AppGlobalPut } from "./opcodes/app_global_put";
import { AppLocalDel } from "./opcodes/app_local_del";
import { AppGlobalDel } from "./opcodes/app_global_del";
import { AppOptedIn } from "./opcodes/app_opted_in";
import { AppLocalGetEx } from "./opcodes/app_local_get_ex";
import { AppGlobalGetEx } from "./opcodes/app_global_get_ex";
import { AssetHoldingGet } from "./opcodes/asset_holding_get";
import { AssetParamsGet } from "./opcodes/asset_params_get";
import { MinBalance } from "./opcodes/min_balance";
import { PushBytes } from "./opcodes/pushbytes";
import { PushInt } from "./opcodes/pushint";
import { Gtxns } from "./opcodes/gtxns";
import { Gtxnsa } from "./opcodes/gtxnsa";
import { Dig } from "./opcodes/dig";
import { Swap } from "./opcodes/swap";
import { Select } from "./opcodes/select";
import { GetBit } from "./opcodes/getbit";
import { SetBit } from "./opcodes/setbit";
import { GetByte } from "./opcodes/getbyte";
import { SetByte } from "./opcodes/setbyte";
import { Gload } from "./opcodes/gload";
import { Gloads } from "./opcodes/gloads";
import { Gaid } from "./opcodes/gaid";
import { Gaids } from "./opcodes/gaids";
import { Callsub } from "./opcodes/callsub";
import { Retsub } from "./opcodes/retsub";
import { Shl } from "./opcodes/shl";
import { Shr } from "./opcodes/shr";
import { Exp } from "./opcodes/exp";
import { Expw } from "./opcodes/expw";
import { Loads } from "./opcodes/loads";
import { Stores } from "./opcodes/stores";
import { AppParamsGet } from "./opcodes/app_params_get";
import { Gtxnas } from "./opcodes/gtxnas";
import { Gtxnsas } from "./opcodes/gtxnsas";
import { Args } from "./opcodes/args";
import { Txnas } from "./opcodes/txnas";
import { ItxnBegin } from "./opcodes/itxn_begin";
import { ItxnField } from "./opcodes/itxn_field";
import { ItxnSubmit } from "./opcodes/itxn_submit";
import { Itxn } from "./opcodes/itxn";
import { Itxna } from "./opcodes/itxna";
import { Divmodw } from "./opcodes/divmodw";
import { Bitlen } from "./opcodes/bitlen";
import { Log } from "./opcodes/Log";
import { Ecdsa_pk_decompress } from "./opcodes/Ecdsa_pk_decompress";
import { Ecdsa_pk_recover } from "./opcodes/Ecdsa_pk_recover";
import { BZero } from "./opcodes/bzero";
import { BInvert } from "./opcodes/binvert";
import { BPlus } from "./opcodes/bplus";

//
// The static definiton of an opcode.
//
export interface IOpcodeDef {
    //
    // The version of TEAL that adds the opcode.
    //
    readonly version: number;

    //
    // The cost of the instruction (at various levels of TEAL versions).
    //
    readonly cost?: number | number[];

    //
    // The number of operands expected by the opcode.
    //
    readonly operands: number | number[] | undefined;

    //
    // The number of stack based arguments expected by this opcode.
    //
    readonly stack: number | undefined;

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
        operands: 2,
        stack: undefined,
        factory: function (token) { return new VersionPragma(token, this) },
    },
    "err":  {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Err(token, this) },
    },
    "sha256":  {
        version: 1,
        cost: [7, 35],
        operands: 0,
        stack: 1,
        factory: function (token) { return new Sha256(token, this) },
    },
    "keccak256":  {
        version: 1,
        cost: [26, 130],
        operands: 0,
        stack: 1,
        factory: function (token) { return new Keccak256(token, this) },
    },
    "sha512_256":  {
        version: 1,
        cost: [9, 45],
        operands: 0,
        stack: 1,
        factory: function (token) { return new Sha512_256(token, this) },
    },
    "ed25519verify":  {
        version: 1,
        cost: 1900,
        operands: 0,
        stack: 3,
        factory: function (token) { return new Ed25519verify(token, this) },
    },
    "+": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Add(token, this) },
    },
    "-": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Minus(token, this) },
    },
    "/": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Div(token, this) },
    },
    "*": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Mul(token, this) },
    },    
    "<": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Lt(token, this) },
    },    
    ">": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Gt(token, this) },
    },    
    "<=": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Lte(token, this) },
    },    
    ">=": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Gte(token, this) },
    },    
    "&&": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new And(token, this) },
    },    
    "||": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Or(token, this) },
    },    
    "==": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Eq(token, this) },
    },    
    "!=": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Ne(token, this) },
    },    
    "!": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Not(token, this) },
    },    
    "len": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Len(token, this) },
    },
    "itob": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Itob(token, this) },
    },   
    "btoi": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Btoi(token, this) },
    },        
    "%": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Mod(token, this) },
    },        
    "|": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Bor(token, this) },
    },      
    "&": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Band(token, this) },
    },    
    "^": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Xor(token, this) },
    },    
    "~": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Complement(token, this) },
    },              
    "mulw": {
        version: 1,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Mulw(token, this) },
    },              
    "intcblock": {
        version: 1,
        operands: undefined,
        stack: 0,
        factory: function (token) { return new Intcblock(token, this) },
    },              
    "intc": {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Intc(token, this) },
    },              
    "intc_0": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Intc_X(token, this, 0) },
    },              
    "intc_1": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Intc_X(token, this, 1) },
    },              
    "intc_2": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Intc_X(token, this, 2) },
    },              
    "intc_3": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Intc_X(token, this, 3) },
    },              
    "bytecblock": {
        version: 1,
        operands: undefined,
        stack: 0,
        factory: function (token) { return new Bytecblock(token, this) },
    },              
    "bytec": {
        operands: 1,
        stack: 0,
        version: 1,
        factory: function (token) { return new Bytec(token, this) },
    },              
    "bytec_0": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Bytec_X(token, this, 0) },
    },              
    "bytec_1": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Bytec_X(token, this, 1) },
    },              
    "bytec_2": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Bytec_X(token, this, 2) },
    },              
    "bytec_3": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Bytec_X(token, this, 3) },
    },              
    "arg": {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Arg(token, this) },
    },
    "arg_0": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Arg_X(token, this, 0) },
    },
    "arg_1": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Arg_X(token, this, 1) },
    },
    "arg_2": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Arg_X(token, this, 2) },
    },
    "arg_3": {
        version: 1,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Arg_X(token, this, 3) },
    },
    "txn": {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Txn(token, this) },
    },
    "global": {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Global(token, this) },
    },
    "gtxn": {
        version: 1,
        operands: 2,
        stack: 0,
        factory: function (token) { return new Gtxn(token, this) },
    },
    "load": {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Load(token, this) },
    },
    "store": {
        version: 1,
        operands: 1,
        stack: 1,
        factory: function (token) { return new Store(token, this) },
    },
    "bnz": {
        version: 1,
        operands: 1,
        stack: 1,
        factory: function (token) { return new Bnz(token, this) },
    },
    "pop": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Pop(token, this) },
    },
    "dup": {
        version: 1,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Dup(token, this) },
    },

    // Pseudo opcodes
    "int":  {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Int(token, this) },
    },
    "byte":  {
        version: 1,
        operands: [1, 2],
        stack: 0,
        factory: function (token) { return new Byte(token, this) },
    },
    "addr":  {
        version: 1,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Addr(token, this) },
    },
    
    // TEAL 2
    "addw": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Addw(token, this) },
    },
    "txna": {
        version: 2,
        operands: 2,
        stack: 0,
        factory: function (token) { return new Txna(token, this) },
    },
    "gtxna": {
        version: 2,
        operands: 3,
        stack: 0,
        factory: function (token) { return new Gtxna(token, this) },
    },
    "bz": {
        version: 2,
        operands: 1,
        stack: 1,
        factory: function (token) { return new Bz(token, this) },
    },
    "b": {
        version: 2,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Branch(token, this) },
    },
    "return": {
        version: 2,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Return(token, this) },
    },
    "dup2": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Dup2(token, this) },
    },
    "concat": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Concat(token, this) },
    },
    "substring": {
        version: 2,
        operands: 2,
        stack: 1,
        factory: function (token) { return new Substring(token, this) },
    },
    "substring3": {
        version: 2,
        operands: 0,
        stack: 3,
        factory: function (token) { return new Substring3(token, this) },
    },
    "balance": {
        version: 2,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Balance(token, this) },
    },
    "app_opted_in": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new AppOptedIn(token, this) },
    },
    "app_local_get": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new AppLocalGet(token, this) },
    },
    "app_local_get_ex": {
        version: 2,
        operands: 0,
        stack: 3,
        factory: function (token) { return new AppLocalGetEx(token, this) },
    },
    "app_global_get": {
        version: 2,
        operands: 0,
        stack: 1,
        factory: function (token) { return new AppGlobalGet(token, this) },
    },
    "app_global_get_ex": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new AppGlobalGetEx(token, this) },
    },
    "app_local_put": {
        version: 2,
        operands: 0,
        stack: 3,
        factory: function (token) { return new AppLocalPut(token, this) },
    },
    "app_global_put": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new AppGlobalPut(token, this) },
    },
    "app_local_del": {
        version: 2,
        operands: 0,
        stack: 2,
        factory: function (token) { return new AppLocalDel(token, this) },
    },
    "app_global_del": {
        version: 2,
        operands: 0,
        stack: 1,
        factory: function (token) { return new AppGlobalDel(token, this) },
    },
    "asset_holding_get": {
        version: 2,
        operands: 1,
        stack: 2,
        factory: function (token) { return new AssetHoldingGet(token, this) },
    },
    "asset_params_get": {
        version: 2,
        operands: 1,
        stack: 1,
        factory: function (token) { return new AssetParamsGet(token, this) },
    },

    // TEAL 3
    "pushbytes": {
        version: 3,
        operands: 1,
        stack: 0,
        factory: function (token) { return new PushBytes(token, this) },
    },
    "pushint": {
        version: 3,
        operands: 1,
        stack: 0,
        factory: function (token) { return new PushInt(token, this) },
    },
    "min_balance": {
        version: 3,
        operands: 0,
        stack: 1,
        factory: function (token) { return new MinBalance(token, this) },
    },
    "gtxns":  {
        version: 3,
        operands: 1,
        stack: 1,
        factory: function (token) { return new Gtxns(token, this) },
    },
    "gtxnsa":  {
        version: 3,
        operands: 2,
        stack: 1,
        factory: function (token) { return new Gtxnsa(token, this) },
    },    
    "dig":  {
        version: 3,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Dig(token, this) },
    },    
    "swap":  {
        version: 3,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Swap(token, this) },
    },    
    "select":  {
        version: 3,
        operands: 0,
        stack: 3,
        factory: function (token) { return new Select(token, this) },
    },    
    "getbit":  {
        version: 3,
        operands: 0,
        stack: 2,
        factory: function (token) { return new GetBit(token, this) },
    },    
    "setbit":  {
        version: 3,
        operands: 0,
        stack: 3,
        factory: function (token) { return new SetBit(token, this) },
    },    
    "getbyte":  {
        version: 3,
        operands: 0,
        stack: 2,
        factory: function (token) { return new GetByte(token, this) },
    },    
    "setbyte":  {
        version: 3,
        operands: 0,
        stack: 3,
        factory: function (token) { return new SetByte(token, this) },
    },    
    "assert": {
        version: 3,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Assert(token, this) },
    },

    // TEAL 4
    "gload": {
        version: 4,
        operands: 2,
        stack: 0,
        factory: function (token) { return new Gload(token, this) },
    },
    "gloads": {
        version: 4,
        operands: 1,
        stack: 1,
        factory: function (token) { return new Gloads(token, this) },
    },
    "gaid": {
        version: 4,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Gaid(token, this) },
    },    
    "gaids": {
        version: 4,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Gaids(token, this) },
    },    
    "callsub": {
        version: 4,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Callsub(token, this) },
    },    
    "retsub": {
        version: 4,
        operands: 0,
        stack: 0,
        factory: function (token) { return new Retsub(token, this) },
    },    
    "shl": {
        version: 4,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Shl(token, this) },
    },    
    "shr": {
        version: 4,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Shr(token, this) },
    },   
    "sqrt": {
        version: 4,
        cost: 4,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Sqrt(token, this) },
    },
    "bitlen": {
        version: 4,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Bitlen(token, this) },
    },
    "exp": {
        version: 4,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Exp(token, this) },
    },    
    "expw": {
        version: 4,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Expw(token, this) },
    },   
    "b+":  {
        version: 4,
        operands: 0,
        stack: 2,
        cost: 10,
        factory: function (token) { return new BPlus(token, this) },
    },        
    "b~":  {
        version: 4,
        operands: 0,
        stack: 1,
        cost: 4,
        factory: function (token) { return new BInvert(token, this) },
    },        
    "bzero":  {
        version: 4,
        operands: 0,
        stack: 1,
        factory: function (token) { return new BZero(token, this) },
    },        
    "divmodw": {
        version: 4,
        operands: 0,
        stack: 4,
        factory: function (token) { return new Divmodw(token, this) },
    },          
    
    // TEAL 5
    "ecdsa_verify":  {
        version: 5,
        cost: 1700,
        operands: 1,
        stack: 5,
        factory: function (token) { return new Ecdsa_verify(token, this) },
    },
    "ecdsa_pk_decompress":  {
        version: 5,
        cost: 650,
        operands: 1,
        stack: 1,
        factory: function (token) { return new Ecdsa_pk_decompress(token, this) },
    },
    "ecdsa_pk_recover":  {
        version: 5,
        cost: 2000,
        operands: 1,
        stack: 4,
        factory: function (token) { return new Ecdsa_pk_recover(token, this) },
    },
    "loads":  {
        version: 5,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Loads(token, this) },
    },
    "stores":  {
        version: 5,
        operands: 0,
        stack: 2,
        factory: function (token) { return new Stores(token, this) },
    },    
    "app_params_get":  {
        version: 5,
        operands: 1,
        stack: 1,
        factory: function (token) { return new AppParamsGet(token, this) },
    },       
    "log":  {
        version: 5,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Log(token, this) },
    },        
    "itxn_begin":  {
        version: 5,
        operands: 0,
        stack: 0,
        factory: function (token) { return new ItxnBegin(token, this) },
    },        
    "itxn_field":  {
        version: 5,
        operands: 1,
        stack: 1,
        factory: function (token) { return new ItxnField(token, this) },
    },
    "itxn_submit":  {
        version: 5,
        operands: 0,
        stack: 0,
        factory: function (token) { return new ItxnSubmit(token, this) },
    },
    "itxn":  {
        version: 5,
        operands: 1,
        stack: 0,
        factory: function (token) { return new Itxn(token, this) },
    },
    "itxna":  {
        version: 5,
        operands: 2,
        stack: 0,
        factory: function (token) { return new Itxna(token, this) },
    },    

    "txnas":  {
        version: 5,
        operands: 1,
        stack: 1,
        factory: function (token) { return new Txnas(token, this) },
    },    
    "gtxnas":  {
        version: 5,
        operands: 2,
        stack: 1,
        factory: function (token) { return new Gtxnas(token, this) },
    },    
    "gtxnsas":  {
        version: 5,
        operands: 1,
        stack: 2,
        factory: function (token) { return new Gtxnsas(token, this) },
    },    
    "args": {
        version: 5,
        operands: 0,
        stack: 1,
        factory: function (token) { return new Args(token, this) },
    },


};