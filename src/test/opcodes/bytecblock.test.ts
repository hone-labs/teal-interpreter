import { Bytecblock } from "../../lib/opcodes/bytecblock";

describe("bytecblock opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "bytecblock",
            operands: [
                "1",
                "2",
                "3",
            ],
        };
        
        const opcode = new Bytecblock(token);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
        };
        opcode.execute(context);

        expect(context.bytecblock.length).toEqual(3);
        expect(Array.from(context.bytecblock[0])).toEqual([ 49 ]);
        expect(Array.from(context.bytecblock[1])).toEqual([ 50 ]);
        expect(Array.from(context.bytecblock[2])).toEqual([ 51 ]);
    });

});