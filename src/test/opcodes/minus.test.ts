import { makeBigInt } from "../../lib/context";
import { Minus } from "../../lib/opcodes/minus";

describe("minus opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "-",
            operands: [],
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(6)), 
                makeBigInt(BigInt(4)),
            ],
        };
        const opcode = new Minus(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(2);
    });

    it("throws on underflow", () => {

        const token: any = {
            opcode: "-",
            operands: [],
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(4)), 
                makeBigInt(BigInt(6)),
            ],
        };
        const opcode = new Minus(token);
        opcode.validateContext(context);
        expect(() => opcode.execute(context)).toThrow();
    });
});