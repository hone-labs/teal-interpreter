import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gtxns } from "../../lib/opcodes/gtxns";

describe("gtxns opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "Fee"
            ],
        };
        const opcode = new Gtxns(token, opcodeDefs.gtxns);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
            ],
            gtxn: [
                {
                    Fee: makeBigInt(BigInt(42)),
                },
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

    it("throws when specified transaction does not exist", () => {

        const token: any = {
            operands: [
                "Fee",
            ],
        };
        const opcode = new Gtxns(token, opcodeDefs.gtxns);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
            ],
            gtxn: [
                // No txns.
            ],
        };     
        expect(() => opcode.validateContext(context)).toThrow();
    });

    it("throws when field does not exist in specified transaction", () => {

        const token: any = {
            operands: [
                "xxx",
            ],
        };
        const opcode = new Gtxns(token, opcodeDefs.gtxns);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
            ],
            gtxn: [
                {
                    // No fields.
                },
            ],
        };
        opcode.validateContext(context);
        expect(() => opcode.execute(context)).toThrow();
    });

});