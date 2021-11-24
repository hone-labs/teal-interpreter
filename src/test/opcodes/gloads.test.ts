import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gloads } from "../../lib/opcodes/gloads";

describe("gloads opcode", () => {

    it ("can gloads from first position", () => {

        const token: any = {
            operands: [
                "0",
            ],
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(0))
            ],
            txnSideEffects: {
                "0": {
                    "0": makeBigInt(BigInt(3)),
                },
            },
        };
        const opcode = new Gloads(token, opcodeDefs.gloads);
        opcode.validateOperand();
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            operands: [
                "xxx",
            ],
        };
        
        const opcode = new Gloads(token, opcodeDefs.gloads);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when txn index is less than 0", () => {

        const token: any = {
            operands: [
                "0",
            ],
        };
        const opcode = new Gloads(token, opcodeDefs.gloads);

        const context: any = {
            stack: [
                makeBigInt(BigInt(-1))
            ],
        };
        expect(() => opcode.validateContext(context)).toThrow();
    });

    it("throws when position operand is less than 0", () => {

        const token: any = {
            operands: [
                "-1",
            ],
        };
        
        const opcode = new Gloads(token, opcodeDefs.gloads);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when scratch operand is greater than 254", () => {

        const token: any = {
            operands: [
                "255",
            ],
        };
        
        const opcode = new Gloads(token, opcodeDefs.gloads);
        expect(() => opcode.validateOperand()).toThrow();
    });
});