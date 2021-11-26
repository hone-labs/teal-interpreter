import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Itxna } from "../../lib/opcodes/itxna";

describe("itxna opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "Something",
                "1",
            ],
        };
        const opcode = new Itxna(token, opcodeDefs.itxna);

        const context: any = {
            stack: [],
            lastItxn: {
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

    it("throws when inner transaction has not been submited", () => {

        const token: any = {
            operands: [
                "xxx",
                "0"
            ],
        };
        const opcode = new Itxna(token, opcodeDefs.itxna);
        opcode.validateOperand();

        const context: any = {
            // No last inner transaction.
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when when index is outside range of fields", () => {

        const token: any = {
            operands: [
                "Something",
                "0",
            ],
        };
        const opcode = new Itxna(token, opcodeDefs.itxna);
        opcode.validateOperand();

        const context: any = {
            lastIxtn: {
                Something: [
                    // No values.
                ],
            },
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when field does not exist in transaction", () => {

        const token: any = {
            operands: [
                "xxx",
                "0",
            ],
        };
        const opcode = new Itxna(token, opcodeDefs.itxna);
        opcode.validateOperand();

        const context: any = {
            lastIxtn: {
                // No fields.
            },
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

});