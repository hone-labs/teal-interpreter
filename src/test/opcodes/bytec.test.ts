import { Bytec } from "../../lib/opcodes/bytec";

describe("bytec opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "bytec",
            operands: [
                "2"
            ],
        };
        const opcode = new Bytec(token);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
            bytecblock: [
                new Uint8Array([1, 2]),
                new Uint8Array([3, 4]),
                new Uint8Array([5, 6]),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0])).toEqual([5, 6]);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            opcode: "int",
            operands: [
                "xxx"
            ],
        };
        const opcode = new Bytec(token);

        expect(() => opcode.validateOperand()).toThrow();
    });

});