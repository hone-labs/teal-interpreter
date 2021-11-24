import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gaid } from "../../lib/opcodes/gaid";

describe("gaid opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "0",
            ],
        };
        const context: any = {
            stack: [],
            gaid: {
                "0": makeBigInt(BigInt(3)),
            },
        };
        const opcode = new Gaid(token, opcodeDefs.gaid);
        opcode.validateOperand();
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
        
        const opcode = new Gaid(token, opcodeDefs.gaid);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when txn index operand is less than 0", () => {

        const token: any = {
            operands: [
                "-1",
            ],
        };
        
        const opcode = new Gaid(token, opcodeDefs.gaid);
        expect(() => opcode.validateOperand()).toThrow();
    });

});