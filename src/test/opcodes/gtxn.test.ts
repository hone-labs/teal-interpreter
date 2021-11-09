import { makeBigInt } from "../../lib/context";
import { Gtxn } from "../../lib/opcodes/gtxn";

describe("gtxn opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "gtxn",
            operands: [
                "0",
                "Fee",
            ],
        };
        const opcode = new Gtxn(token);

        opcode.validateOperand(); // Parses the operands.

        const context: any = {
            stack: [],
            txns: [
                {
                    Fee: makeBigInt(BigInt(42)),
                },
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            opcode: "gtxn",
            operands: [
                "not-an-int",
                "Fee",
            ],
        };
        const opcode = new Gtxn(token);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when there is no transaction for specified index", () => {

        const token: any = {
            opcode: "gtnx",
            operands: [
                "0",
                "Fee",
            ],
        };
        const opcode = new Gtxn(token);
        opcode.validateOperand();

        const context: any = {
            stack : [],
            txns: [
                // No transactions.
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when field does not exist in specified transaction", () => {

        const token: any = {
            opcode: "gtxn",
            operands: [
                "0",
                "xxx"
            ],
        };

        const opcode = new Gtxn(token);
        opcode.validateOperand();

        const context: any = {
            txn: [
                {
                    // No fields.
                },
            ],
        };     
        expect(() => opcode.execute(context)).toThrow();
    });

});