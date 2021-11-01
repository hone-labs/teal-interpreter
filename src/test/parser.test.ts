import { parse } from "../parser";
import * as dedent from "dedent";

describe("teal parser", () => {

    it("throws error when parsing an unrecognised opcode", () => {

        expect(() => parse("foobar")).toThrow();
    });
});
