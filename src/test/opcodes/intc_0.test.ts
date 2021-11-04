import { Intc_0 } from "../../lib/opcodes/intc_0";

describe("intc_0 opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "intc_0",
            operands: [],
        };
        const opcode = new Intc_0(token);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
            intcblock: [
                BigInt(1),
                BigInt(2),
                BigInt(3),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(1);
    });

});