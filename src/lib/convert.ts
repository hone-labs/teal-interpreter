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

    throw new Error(`Unexpected value "${valueDef}"".`);
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
// Load a lookup table from config.
//
export function loadTable<FromT, ToT>(obj: ITable<FromT> | undefined, loader: (config: FromT) => ToT): ITable<ToT> {
    const loaded: ITable<ToT> = {};
    if (obj) {
        for (const [key, value] of Object.entries(obj)) {
            loaded[key] = loader(value);
        }
    }

    return loaded;
}

//
// Load a lookup table from config with potentially nested tables.
//
export function loadNestedTable<FromT, ToT>(obj: ITable<FromT | ITable<FromT>> | undefined, loader: (config: FromT) => ToT): ITable<ToT | ITable<ToT>> {
    const loaded: ITable<ToT | ITable<ToT>> = {};
    if (obj) {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof(value) === "object") {
                // Allowing nesting to one level.
                const nested: ITable<ToT> = {};
                for (const [nestedKey, nestedValue] of Object.entries(value)) {
                    nested[nestedKey] = loader(nestedValue);
                }                
                loaded[key] = nested;
            }
            else {
                loaded[key] = loader(value);
            }
        }
    }

    return loaded;
}

//
// Serializes a table of values.
//
export function serializeValueTable(valueTable: ITable<ITypedValue>): ITable<ValueDef> {
    const valueMap: ITable<ValueDef> = {};
    for (const key of Object.keys(valueTable)) {
        //TODO: Need to serialize next level as well.
        valueMap[key] = serializeValue(valueTable[key]);
    }    

    return valueMap;
}


