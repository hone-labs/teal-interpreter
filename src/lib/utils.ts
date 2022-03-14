
//
// Allows JSON.stringify to serialize a BigInt.
//
export function serializeBigInt(key: string, value: any): any {
    return typeof value === 'bigint'
        ? value.toString()
        : value // return everything else unchanged
};

//
// Stringifies an object for display.
//
export function stringify(obj: any): string {
    return JSON.stringify(obj, serializeBigInt, 4);
}



//
// Dumps an object using console.log.
//
export function dump(obj: any): void {
    console.log(stringify(obj));
}

