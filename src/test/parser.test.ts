import { parse } from "..";

describe("teal parser", () => {

    it("parsing empty program results in no output", () => {

        const result = parse("");
        expect(result.instructions).toEqual([]);
    });

    it("can parse opcode with no operands", ()  => {

        const result = parse("return");
        expect(result.instructions).toEqual([
            `return`,
        ]);
    });

});
