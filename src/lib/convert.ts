import { decodeAddress } from "algosdk";

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