import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Txnas } from "../../lib/opcodes/txnas";

describe("txnas opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "Something",
            ],
        };
        const opcode = new Txnas(token, opcodeDefs.txnas);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
            ],
            txn:{
                Something: [
                    makeBigInt(BigInt(8)),
                ],
            },
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(8);
    });

    it("throws when when index is outside range of fields", () => {

        const token: any = {
            operands: [
                "Something",
            ],
        };
        const opcode = new Txnas(token, opcodeDefs.txnas);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
            ],
            txn:{
                Something: [
                    // No values.
                ],
            },
        };
     
        opcode.validateContext(context);
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when field does not exist in specified transaction", () => {

        const token: any = {
            operands: [
                "xxx",
            ],
        };
        const opcode = new Txnas(token, opcodeDefs.txnas);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
            ],
            txn: {
                // No fields.
            },
        };
     
        opcode.validateContext(context);
        expect(() => opcode.execute(context)).toThrow();
    });

});