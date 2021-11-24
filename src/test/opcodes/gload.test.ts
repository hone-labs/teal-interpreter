import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gload } from "../../lib/opcodes/gload";

describe("gload opcode", () => {

    it ("can gload from first position", () => {

        const token: any = {
            operands: [
                "0",
                "0",
            ],
        };
        const context: any = {
            stack: [],
            txnSideEffects: {
                "0": {
                    "0": makeBigInt(BigInt(3)),
                },
            },
        };
        const opcode = new Gload(token, opcodeDefs.gload);
        opcode.validateOperand(); // Parses the operand.
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });

    it("throws when first operand is not an int", () => {

        const token: any = {
            operands: [
                "xxx",
                "0",
            ],
        };
        
        const opcode = new Gload(token, opcodeDefs.gload);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when second operand is not an int", () => {

        const token: any = {
            operands: [
                "0",
                "xxx",
            ],
        };
        
        const opcode = new Gload(token, opcodeDefs.gload);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when txn index operand is less than 0", () => {

        const token: any = {
            operands: [
                "-1",
                "0",
            ],
        };
        
        const opcode = new Gload(token, opcodeDefs.gload);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when position operand is less than 0", () => {

        const token: any = {
            operands: [
                "0",
                "-1",
            ],
        };
        
        const opcode = new Gload(token, opcodeDefs.gload);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when scratch operand is greater than 254", () => {

        const token: any = {
            operands: [
                "0",
                "255",
            ],
        };
        
        const opcode = new Gload(token, opcodeDefs.gload);
        expect(() => opcode.validateOperand()).toThrow();
    });
});