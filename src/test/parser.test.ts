import { parse } from "../lib/parser";

describe("teal parser", () => {

    it("throws error when parsing an unrecognised opcode", () => {

        expect(() => parse("foobar")).toThrow();
    });

    it("throws when operands are not valid", () => {

        expect(() => parse("int")).toThrow();
    });
});
