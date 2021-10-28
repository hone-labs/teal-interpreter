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
    
    it("can handle blank lines", () => {

        const result = parse(dedent(`
            return
            
            pop
        `));

        expect(result.instructions.length).toEqual(2);
    });

    it("can handle multiple whitespace between opcode and operands", () => {

        const result = parse(dedent(`
            int   1
        `));

        expect(result.instructions.length).toEqual(1);
        expect(result.instructions[0].operands.length).toEqual(1);
    });

    it("can handle multiple whitespace between operands", () => {

        const result = parse(dedent(`
            txna Accounts    2
        `));

        expect(result.instructions.length).toEqual(1);
        expect(result.instructions[0].operands.length).toEqual(2);
    });

    it("can strip comments", () => {
        const result = parse(dedent(`
            int 5 # Push an int on the stack.
        `));

        expect(result.instructions.length).toEqual(1);
        expect(result.instructions[0].operands.length).toEqual(1);
    });
});
