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

    it("can parse version pragma", () => {

        const tokens = tokenize(dedent(`
            #pragma version 3
        `));

        expect(tokens.length).toEqual(1);
        
        const token = tokens[0];
        expect(token.opcode).toEqual("#pragma");
        
        expect(token.operands.length).toEqual(2);
        expect(token.operands[0]).toEqual("version");
        expect(token.operands[1]).toEqual("3");
    });
});
