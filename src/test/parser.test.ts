import { parse } from "..";
import * as dedent from "dedent";

describe("teal parser", () => {

    it("parsing empty program results in no output", () => {

        const result = parse("");
        expect(result.instructions).toEqual([]);
    });

    it("can parse opcode with no operands", ()  => {

        const result = parse("return");
        expect(result.instructions).toEqual([
            {
                opcode: `return`,
                operands: [],
            },
        ]);
    });

    it("can parse opcode with operands", ()  => {

        const result = parse("txna Accounts 2");
        expect(result.instructions).toEqual([
            {
                opcode: `txna`,
                operands: [ 
		            `Accounts`,
		            `2`,
                ],
            },
        ]);
    });

    it("can parse multiple lines", () => {

        const result = parse(dedent(`
            return
            pop
        `));

        expect(result.instructions.length).toEqual(2);
    });
    

});
