import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Store } from "../../lib/opcodes/store";

describe("load opcode", () => {

    it ("can store to first position", () => {

        const token: any = {
            opcode: "store",
            operands: [
                "0"
            ],
        };
        const opcode = new Store(token, opcodeDefs.store);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [
                makeBigInt(BigInt(12)),
            ],
            scratch: [
                makeBigInt(BigInt(0)),
            ],
        };
        opcode.execute(context);

        expect(Number(context.scratch[0]?.value)).toEqual(12);
    });

    it ("can store to second position", () => {

        const token: any = {
            opcode: "store",
            operands: [
                "1"
            ],
        };
        const opcode = new Store(token, opcodeDefs.store);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [
                makeBigInt(BigInt(3)),
            ],
            scratch: [
                makeBigInt(BigInt(0)),
                makeBigInt(BigInt(0)),
            ],
        };
        opcode.execute(context);

        expect(Number(context.scratch[1]?.value)).toEqual(3);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            opcode: "store",
            operands: [
                "xxx"
            ],
        };
        
        const opcode = new Store(token, opcodeDefs.store);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when operand is less than 0", () => {

        const token: any = {
            opcode: "store",
            operands: [
                "-1"
            ],
        };
        
        const opcode = new Store(token, opcodeDefs.store);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when operand is greater than 254", () => {

        const token: any = {
            opcode: "store",
            operands: [
                "255"
            ],
        };
        
        const opcode = new Store(token, opcodeDefs.store);
        expect(() => opcode.validateOperand()).toThrow();
    });
});