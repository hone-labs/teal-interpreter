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
// Encodes an address-string to a byte array to be pushed on the compute stack.
//
export function encodeAddress(address: string): Uint8Array {
    return Buffer.from(address);
}

//
// Decodes a byte array popped from the compute stack to a string-string.
//
export function decodeAddress(bytes: Uint8Array) {
    return bytes.toString();
}

//
// Loads a single value.
//
export function loadValue(valueDef: ValueDef): ITypedValue {
    if (typeof valueDef === "bigint") {
        return makeBigInt(valueDef, valueDef);
    }
    if (typeof valueDef === "number") {
        return makeBigInt(BigInt(valueDef), valueDef);
    }
    else if (typeof valueDef === "string") {
        if (valueDef.startsWith("int:")) {
            return makeBigInt(BigInt(valueDef.slice("int:".length)), valueDef);
        }
        else if (valueDef.startsWith("string:")) {
            return makeBytes(Buffer.from(valueDef.slice("string:".length)), valueDef);
        }
        else if (valueDef.startsWith("addr:")) {
            return makeBytes(encodeAddress(valueDef.slice("addr:".length)), valueDef)
        }
        else if (valueDef.startsWith("b64:")) {
            return makeBytes(stringToBytes(valueDef.slice("b64:".length), "base64"), valueDef);
        }
        else {
            // Assume string.
            return makeBytes(Buffer.from(valueDef), valueDef);
        }
    }

    if (valueDef.type === "array") {
        return makeBytes(new Uint8Array(valueDef.value), valueDef);
    }
    else if (valueDef.type === "int") {
        return makeBigInt(BigInt(valueDef.value), valueDef);
    }
    else if (valueDef.type === "string") {
        return makeBytes(new Uint8Array(Buffer.from(valueDef.value)), valueDef);
    }
    else if (valueDef.type === "addr") {
        return makeBytes(encodeAddress(valueDef.value), valueDef);
    }
    else {
        throw new Error(`Unexpected arg type ${valueDef.type}.`);
    }
}

//
// Serialize a typed value.
//
export function serializeValue(value: ITypedValue): any {
    if (value.type === "bigint") {
        return Number(value.value);
    }
    else {
        return Buffer.from(value.value as Uint8Array).toString();
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
// Serializes a table of values.
//
export function serializeValueTable(valueTable: ITable<ITypedValue>): ITable<ValueDef> {
    const valueMap: ITable<ValueDef> = {};
    for (const key of Object.keys(valueTable)) {
        valueMap[key] = serializeValue(valueTable[key]);
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

