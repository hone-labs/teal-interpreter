import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Itxn } from "../../lib/opcodes/itxn";

describe("itxn opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "Something"
            ],
        };
        const opcode = new Itxn(token, opcodeDefs.itxn);
        opcode.validateOperand();

        const context: any = {
            stack: [],
            lastItxn: {
                Something: makeBigInt(BigInt(42)),
            },
        };

        opcode.execute(context);
        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

    it("throws when inner transaction has not been submited", () => {

        const token: any = {
            operands: [
                "xxx"
            ],
        };
        const opcode = new Itxn(token, opcodeDefs.itxn);
        opcode.validateOperand();

        const context: any = {
            // No last inner transaction.
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when field does not exist in current transaction", () => {

        const token: any = {
            operands: [
                "xxx"
            ],
        };
        const opcode = new Itxn(token, opcodeDefs.itxn);
        opcode.validateOperand();

        const context: any = {
            lastItxn: {
                // No fields.
            },
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

});