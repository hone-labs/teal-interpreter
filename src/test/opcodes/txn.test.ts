import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Txn } from "../../lib/opcodes/txn";

describe("txn opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "txn",
            operands: [
                "Fee"
            ],
        };
        const context: any = {
            stack: [],
            txn: {
                Fee: makeBigInt(BigInt(42)),
            },
        };
        const opcode = new Txn(token, opcodeDefs.txn);
        opcode.validateOperand(); // Parses the operand.
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

    it("throws when field does not exist in current transaction", () => {

        const token: any = {
            opcode: "txn",
            operands: [
                "xxx"
            ],
        };
        const opcode = new Txn(token, opcodeDefs.txn);
        opcode.validateOperand();

        const context: any = {
            txn: {
                // No fields.
            },
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

});