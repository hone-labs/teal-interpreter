import { decodeAddress, encodeUint64 } from "algosdk";
import { IArgDef } from "./interpreter";
import * as base32 from "hi-base32";

export type Encoding = "base64" | "b64" | "base32" | "b32" | "hex";

//
// Converts a string to a byte array.
// Defaults to base64 encoding.
//
export function stringToBytes(input: string, encoding?: Encoding): Uint8Array {
    if (encoding === undefined) {
        encoding = "base64";
    }

    switch (encoding) {
        case "base64":
        case "b64":
            return Buffer.from(input, "base64");

        case "base32":
        case "b32":
            return Buffer.from(base32.decode(input));

        case "hex":
            return Buffer.from(input, "hex");


        default:
            throw new Error(`Unknown encoding type ${encoding}`);
    }
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