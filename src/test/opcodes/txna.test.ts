import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Txna } from "../../lib/opcodes/txna";

describe("txna opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "Something",
                "1",
            ],
        };
        const opcode = new Txna(token, opcodeDefs.txna);

        const context: any = {
            stack: [],
            txn:{
                Something: [
                    makeBigInt(BigInt(1)),
                    makeBigInt(BigInt(2)),
                    makeBigInt(BigInt(3)),
                ],
            },
        };
        opcode.validateOperand();
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(2);
    });

    it("throws when when index is outside range of fields", () => {

        const token: any = {
            operands: [
                "Something",
                "0",
            ],
        };
        const opcode = new Txna(token, opcodeDefs.txna);
        opcode.validateOperand();

        const context: any = {
            txn:{
                Something: [
                    // No values.
                ],
            },
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when field does not exist in specified transaction", () => {

        const token: any = {
            operands: [
                "xxx",
                "0",
            ],
        };
        const opcode = new Txna(token, opcodeDefs.txna);
        opcode.validateOperand();

        const context: any = {
            txn:{
                // No fields.
            },
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

});