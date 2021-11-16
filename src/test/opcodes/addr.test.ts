import { opcodeDefs } from "../../lib/opcodes";
import { Addr } from "../../lib/opcodes/addr";

describe("addr opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224",
            ],
        };        
        const opcode = new Addr(token, opcodeDefs.addr);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            250,  92, 250, 145, 251,  0,  83,  75,
            119,  25, 237, 138, 135, 53, 111, 180,
            243, 214,  98, 253,  57, 85, 197, 125,
            43,  52, 144,   3, 126, 49,  15,  52
        ]);
    });

});