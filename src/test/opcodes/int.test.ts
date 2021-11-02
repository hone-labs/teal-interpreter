import { Int } from "../../lib/opcodes/int";

describe("int opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "int",
            operands: [
                "12"
            ],
        };
        const context: any = {
            stack: [],
        };
        const opcode = new Int(token);
        opcode.validateOperand(); // Parses the operand.
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(12);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            opcode: "int",
            operands: [
                "xxx"
            ],
        };
        const opcode = new Int(token);

        expect(() => opcode.validateOperand()).toThrow();
    });

});