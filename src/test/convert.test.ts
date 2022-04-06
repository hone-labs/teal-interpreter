import { ITypedValue } from "../lib/context";
import { decodeAddress, encodeAddress, loadValue, serializeValue, serializeValueTable } from "../lib/convert";

describe("convert", () => {

    it("encoded int arg is converted", () => {

        const converted = loadValue("int:2");
        expect(converted.type).toEqual("bigint");
        expect(Number(converted.value)).toEqual(2);
    });

    it("raw int arg is converted by default", () => {

        const converted = loadValue(2);
        expect(converted.type).toEqual("bigint");
        expect(Number(converted.value)).toEqual(2);
    });

    it("encoded string arg is converted", () => {

        const converted = loadValue("string:hello");
        expect(converted.type).toEqual("byte[]");
        expect(Array.from(converted.value as Uint8Array)).toEqual([
            104, 101, 108, 108, 111
        ]);
    });

    it("raw string arg is converted by default", () => {

        const converted = loadValue("hello");
        expect(converted.type).toEqual("byte[]");
        expect(Array.from(converted.value as Uint8Array)).toEqual([
            104, 101, 108, 108, 111
        ]);
    });

    it("array is converted", () => {

        const converted = loadValue([1, 2, 3, 4]);
        expect(converted.type).toEqual("byte[]");
        expect(Array.from(converted.value as Uint8Array)).toEqual([
            1, 2, 3, 4
        ]);
    });

    it("UInt8Array is converted", () => {

        const converted = loadValue(new Uint8Array([1, 2, 3, 4]));
        expect(converted.type).toEqual("byte[]");
        expect(Array.from(converted.value as Uint8Array)).toEqual([
            1, 2, 3, 4
        ]);
    });

    it("encoded base64 arg is converted", () => {

        const converted = loadValue("b64:iZWMx72KvU6Bw6sPAWQFL96YH+VMrBA0XKWD9XbZOZI=");

        expect(converted.type).toEqual("byte[]");
        expect(Array.from(converted.value as Uint8Array)).toEqual([
            137, 149, 140, 199, 189, 138, 189,  78,
            129, 195, 171,  15,   1, 100,   5,  47,
            222, 152,  31, 229,  76, 172,  16,  52,
             92, 165, 131, 245, 118, 217,  57, 146            
        ]);
    });

    it("unexpected arg type throws", () => {

        const badInput: any = { type: "fooey" };
        expect(() => loadValue(badInput)).toThrow();
    });

    it("can encode and decode address", () => {
        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        expect(decodeAddress(encodeAddress(addr))).toEqual(addr);
    });

    it("can serialize a bigint value", () => {

        const serialized = serializeValue({ type: "bigint", value: BigInt(3) });
        expect(serialized).toEqual(3);
    });

    it("can serialize a byte[] value", () => {

        const serialized = serializeValue({ type: "byte[]", value: Buffer.from("Hello") });
        expect(serialized).toEqual("Hello");
    });

    it("can serialize value table", () => {

        const serialized = serializeValueTable({
            aValue: {
                type: "bigint",
                value: BigInt(2),
            },
        });
        expect(serialized.aValue).toEqual(2);
    });
});
