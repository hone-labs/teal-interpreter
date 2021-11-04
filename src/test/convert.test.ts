import dedent = require("dedent");
import { convertArg } from "../lib/convert";

describe("convert", () => {

    it("byte array arg is converted", () => {

        const converted = convertArg({
            type: "array",
            value: [1, 2],
        });
        expect(Array.from(converted)).toEqual([1, 2]);
    });

    it("int arg is converted", () => {

        const converted = convertArg({
            type: "int",
            value: 2,
        });
        expect(Array.from(converted)).toEqual([
            0, 0, 0, 0,
            0, 0, 0, 2            
        ]);
    });

    it("string arg is converted", () => {

        const converted = convertArg({
            type: "string",
            value: "hello",
        });
        expect(Array.from(converted)).toEqual([
            104, 101, 108, 108, 111
        ]);
    });

    it("addr arg is converted", () => {

        const converted = convertArg({
            type: "addr",
            value: "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224",
        });

        expect(Array.from(converted)).toEqual([
            250,  92, 250, 145, 251,  0,  83,  75,
            119,  25, 237, 138, 135, 53, 111, 180,
            243, 214,  98, 253,  57, 85, 197, 125,
             43,  52, 144,   3, 126, 49,  15,  52            
        ]);
    });

    it("unexpected arg type throws", () => {

        const badInput: any = { type: "fooey" };
        expect(() => convertArg(badInput)).toThrow();
    })
});
