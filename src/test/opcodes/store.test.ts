import { ValueType } from "../..";
import { Store } from "../../lib/opcodes/store";

describe("load opcode", () => {

    it ("can store to first position", () => {

        const token: any = {
            opcode: "store",
            operands: [
                "0"
            ],
        };
        const opcode = new Store(token);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [
                BigInt(12),
            ],
            scratch: new Array<ValueType>(1).fill(BigInt(0)),
        };
        opcode.execute(context);

        expect(Number(context.scratch[0])).toEqual(12);
    });

    it ("can store to second position", () => {

        const token: any = {
            opcode: "store",
            operands: [
                "1"
            ],
        };
        const opcode = new Store(token);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [
                BigInt(3),
            ],
            scratch: new Array<ValueType>(2).fill(BigInt(0)),
        };
        opcode.execute(context);

        expect(Number(context.scratch[1])).toEqual(3);
    });
    it("throws when operand is not an int", () => {

        const token: any = {
            opcode: "store",
            operands: [
                "xxx"
            ],
        };
        
        const opcode = new Store(token);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when operand is less than 0", () => {

        const token: any = {
            opcode: "store",
            operands: [
                "-1"
            ],
        };
        
        const opcode = new Store(token);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when operand is greater than 254", () => {

        const token: any = {
            opcode: "store",
            operands: [
                "255"
            ],
        };
        
        const opcode = new Store(token);
        expect(() => opcode.validateOperand()).toThrow();
    });
});