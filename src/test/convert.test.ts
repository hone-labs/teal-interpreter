import dedent = require("dedent");
import { loadValue, loadValueMap } from "../lib/convert";

describe("convert", () => {

    it("byte array arg is converted", () => {

        const converted = loadValue({
            type: "array",
            value: [1, 2],
        });
        expect(converted.type).toEqual("byte[]");
        expect(Array.from(converted.value as Uint8Array)).toEqual([1, 2]);
    });

    it("int arg is converted", () => {

        const converted = loadValue({
            type: "int",
            value: 2,
        });
        expect(converted.type).toEqual("bigint");
        expect(Number(converted.value)).toEqual(2);
    });

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

    it("string arg is converted", () => {

        const converted = loadValue({
            type: "string",
            value: "hello",
        });
        expect(converted.type).toEqual("byte[]");
        expect(Array.from(converted.value as Uint8Array)).toEqual([
            104, 101, 108, 108, 111
        ]);
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

    it("addr arg is converted", () => {

        const converted = loadValue({
            type: "addr",
            value: "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224",
        });

        expect(converted.type).toEqual("byte[]");
        expect(Array.from(converted.value as Uint8Array)).toEqual([
            250,  92, 250, 145, 251,  0,  83,  75,
            119,  25, 237, 138, 135, 53, 111, 180,
            243, 214,  98, 253,  57, 85, 197, 125,
             43,  52, 144,   3, 126, 49,  15,  52            
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

    it("can load value map", () => {

        const valueMap = loadValueMap({
            "someValue": "hello",
        });
        expect(Object.keys(valueMap)).toEqual(["someValue"]);
        expect(valueMap.someValue.type).toEqual("byte[]");
        expect(Buffer.from(valueMap.someValue.value as Uint8Array).toString()).toEqual("hello");
    });
});
