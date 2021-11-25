import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gtxnas } from "../../lib/opcodes/gtxnas";

describe("gtxnas opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "0",
                "Something",
            ],
        };
        const opcode = new Gtxnas(token, opcodeDefs.gtxnas);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(0))
            ],
            gtxn: [
                {
                    Something: [ makeBigInt(BigInt(42)) ],
                },
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

    it("throws when when index is outside range of transactions", () => {

        const token: any = {
            operands: [
                "0",
                "xxx",
            ],
        };
        const opcode = new Gtxnas(token, opcodeDefs.gtxnas);
        opcode.validateOperand();

        const context: any = {
            gtxn: [
                // No transactions.
            ],
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when field does not exist in specified transaction", () => {

        const token: any = {
            operands: [
                "0",
                "xxx",
            ],
        };
        const opcode = new Gtxnas(token, opcodeDefs.gtxnas);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(0))
            ],
            gtxn: [
                {
                    // No fields.
                },
            ],
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

});