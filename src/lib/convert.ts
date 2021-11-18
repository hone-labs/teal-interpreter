import { decodeAddress } from "algosdk";
import * as base32 from "hi-base32";
import { ITable, ValueDef } from "./config";
import { ITypedValue, makeBigInt, makeBytes } from "./context";

export type Encoding = "base64" | "b64" | "base32" | "b32" | "hex" | "utf8";

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

        case "utf8":
            return Buffer.from(input);

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
// Loads a single value.
//
export function loadValue(valueDef: ValueDef): ITypedValue {
    if (typeof valueDef === "bigint") {
        return makeBigInt(valueDef);
    }
    if (typeof valueDef === "number") {
        return makeBigInt(BigInt(valueDef));
    }
    else if (typeof valueDef === "string") {
        if (valueDef.startsWith("int:")) {
            return makeBigInt(BigInt(valueDef.slice("int:".length)));
        }
        else if (valueDef.startsWith("string:")) {
            return makeBytes(Buffer.from(valueDef.slice("string:".length)));
        }
        else if (valueDef.startsWith("addr:")) {
            return makeBytes(decodeAddress(valueDef.slice("addr:".length)).publicKey);
        }
        else if (valueDef.startsWith("b64:")) {
            return makeBytes(stringToBytes(valueDef.slice("b64:".length), "base64"));
        }
        else {
            // Assume string.
            return makeBytes(Buffer.from(valueDef));
        }
    }

    if (valueDef.type === "array") {
        return makeBytes(new Uint8Array(valueDef.value));
    }
    else if (valueDef.type === "int") {
        return makeBigInt(BigInt(valueDef.value));
    }
    else if (valueDef.type === "string") {
        return makeBytes(new Uint8Array(Buffer.from(valueDef.value)));
    }
    else if (valueDef.type === "addr") {
        return makeBytes(decodeAddress(valueDef.value).publicKey);
    }
    else {
        throw new Error(`Unexpected arg type ${valueDef.type}.`);
    }
}

//
// Load an array of values.
//
export function loadValues(values: ValueDef[]): ITypedValue[] {
    return values.map(loadValue);
}

//
// Loads a lookup table of values.
//
export function loadValueTable(valueDefTable?: ITable<ValueDef>): ITable<ITypedValue> {
    const valueMap: ITable<ITypedValue> = {};
    if (valueDefTable) {
        for (const key of Object.keys(valueDefTable)) {
            valueMap[key] = loadValue(valueDefTable[key]);
        }    
    }

    return valueMap;
}

//
// Loads a lookup table of values (allowing arrays of values).
//
export function loadValueTableWithArrays(valueDefTable?: ITable<ValueDef | ValueDef[]>): ITable<ITypedValue | ITypedValue[]> {
    const valueMap: ITable<ITypedValue | ITypedValue[]> = {};
    if (valueDefTable) {
        for (const key of Object.keys(valueDefTable)) {
            const valueDef = valueDefTable[key];
            if (Array.isArray(valueDef)) {
                valueMap[key] = valueDef.map(loadValue);
            }
            else {
                valueMap[key] = loadValue(valueDef);
            }
        }    
    }

    return valueMap;
}

