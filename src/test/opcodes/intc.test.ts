import { opcodeDefs } from "../../lib/opcodes";
import { Intc } from "../../lib/opcodes/intc";

describe("intc opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "2"
            ],
        };
        const opcode = new Intc(token, opcodeDefs.intc);
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

    it("throws when operand is not an int", () => {

        const token: any = {
            operands: [
                "xxx"
            ],
        };
        const opcode = new Intc(token, opcodeDefs.intc);

        expect(() => opcode.validateOperand()).toThrow();
    });

});