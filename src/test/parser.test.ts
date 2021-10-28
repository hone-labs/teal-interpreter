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

    it("can parse opcode with no operand", ()  => {

        const result = parse("return");
        expect(result.instructions).toEqual([
            `return`,
        ]);
    });

    it("can parse opcode with operands", ()  => {

        const result = parse("txna Accounts 2");
        expect(result.instructions).toEqual([
            `txna`,
            `Accounts`,
            `2`,
        ]);
    });
    

});
