import { opcodeDefs } from "../../lib/opcodes";
import { Intc_X } from "../../lib/opcodes/intc_X";

describe("intc_X opcode", () => {

    it ("can execute with index 0", () => {

        const token: any = {
            opcode: "intc_0",
            operands: [],
        };
        const opcode = new Intc_X(token, opcodeDefs.intc_0, 0);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
            intcblock: [
                BigInt(1),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0].value)).toEqual(1);
    });

    it ("can execute with index 2", () => {

        const token: any = {
            opcode: "intc_2",
            operands: [],
        };
        const opcode = new Intc_X(token, opcodeDefs.intc_2, 2);
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
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });

});