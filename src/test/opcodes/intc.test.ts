import { Intc } from "../../lib/opcodes/intc";

describe("intc opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "intc",
            operands: [
                "2"
            ],
        };
        const opcode = new Intc(token);
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
            opcode: "int",
            operands: [
                "xxx"
            ],
        };
        const opcode = new Intc(token);

        expect(() => opcode.validateOperand()).toThrow();
    });

});