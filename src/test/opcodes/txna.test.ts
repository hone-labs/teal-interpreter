import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Txna } from "../../lib/opcodes/txna";

describe("txna opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "0",
                "Fee"
            ],
        };
        const opcode = new Txna(token, opcodeDefs.txna);

        const context: any = {
            stack: [],
            txns: [
                {
                    Fee: makeBigInt(BigInt(42)),
                },
            ],
        };
        opcode.validateOperand(); // Parses the operand.
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
        const opcode = new Txna(token, opcodeDefs.txna);
        opcode.validateOperand();

        const context: any = {
            txns: [
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
        const opcode = new Txna(token, opcodeDefs.txna);
        opcode.validateOperand();

        const context: any = {
            txns: [
                {
                    // No fields.
                },
            ],
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

});