import { decodeAddress, encodeUint64 } from "algosdk";
import { IArgDef } from "./interpreter";

//
// Converts a string to a byte array.
// Defaults to base64 encoding.
//
export function stringToBytes(input: string, encoding?: BufferEncoding): Uint8Array {
    if (encoding === undefined) {
        encoding = "base64";
    }
    return Buffer.from(input, encoding) as Uint8Array;
}

//
// Converts a blockchain address to a byte array.
//
export function addressToBytes(address: string): Uint8Array {
    return decodeAddress(address).publicKey;
}

//
// Converts an array of arguments to an array of byte arrays.
//
export function convertArgs(args: IArgDef[]): Uint8Array[] {
    return args.map(convertArg);
}

//
// Converts a single argument to a byte array.
//
export function convertArg(arg: IArgDef): Uint8Array {
    const argDef = arg as IArgDef;
    if (argDef.type === "array") {
        return new Uint8Array(argDef.value);
    }
    if (argDef.type === "int") {
        return encodeUint64(argDef.value);
    }
    else if (argDef.type === "string") {
        return new Uint8Array(Buffer.from(argDef.value));
    }
    else if (argDef.type === "addr") {
        return decodeAddress(argDef.value).publicKey;
    }
    else {
        throw new Error(`Unexpected arg type ${argDef.type}.`);
    }
}