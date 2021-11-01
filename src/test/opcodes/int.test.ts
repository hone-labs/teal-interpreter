import { Int } from "../../lib/opcodes/int";

describe("int opcode", () => {

    it ("can execute", () => {

        const token = {
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
});