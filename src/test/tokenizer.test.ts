import { tokenize } from "../tokenize";
import * as dedent from "dedent";

describe("teal tokenizer", () => {

    it("parsing empty program results in no output", () => {

        expect(tokenize("")).toEqual([]);
    });

    it("can parse opcode with no operands", ()  => {

        const instructions = tokenize("return");
        expect(instructions).toEqual([
            {
                opcode: `return`,
                operands: [],
            },
        ]);
    });

    it("can parse opcode with operands", ()  => {

        const instructions = tokenize("txna Accounts 2");
        expect(instructions).toEqual([
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

        const instructions = tokenize(dedent(`
            return
            pop
        `));

        expect(instructions.length).toEqual(2);
    });
    
    it("can handle blank lines", () => {

        const instructions = tokenize(dedent(`
            return

            pop
        `));

        expect(instructions.length).toEqual(2);
    });

    it("can handle multiple whitespace between opcode and operands", () => {

        const instructions = tokenize(dedent(`
            int 1
        `));

        expect(instructions.length).toEqual(1);
        expect(instructions[0].operands.length).toEqual(1);
    });

    it("can handle multiple whitespace between operands", () => {

        const instructions = tokenize(dedent(`
            txna Accounts    2
        `));

        expect(instructions.length).toEqual(1);
        expect(instructions[0].operands.length).toEqual(2);
    });

    it("can strip comments", () => {
        const instructions = tokenize(dedent(`
            int 5 # Push an int on the stack.
        `));

        expect(instructions.length).toEqual(1);
        expect(instructions[0].operands.length).toEqual(1);
    });
});
