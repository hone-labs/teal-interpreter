import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Dig } from "../../lib/opcodes/dig";

describe("dig opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "1",
            ],
        };
        const opcode = new Dig(token, opcodeDefs.dig);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(1)),
                makeBigInt(BigInt(2)),
                makeBigInt(BigInt(3)),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(4);
        expect(Number(context.stack[3]?.value)).toEqual(2);
    });

    it("throws when not enough values on the stack", () => {
        const token: any = {
            opcode: "dig",
            operands: [
                "1",
            ],
        };
        const opcode = new Dig(token, opcodeDefs.dig);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(1)), // Not enough values on the stack.
            ],
        };
        expect(() => opcode.validateContext(context)).toThrow();
    });
});;
