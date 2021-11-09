import { makeBigInt } from "../../lib/context";
import { Mul } from "../../lib/opcodes/mul";

describe("mul opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "*",
            operands: [],            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(10)), 
                makeBigInt(BigInt(2)),
            ],
        };
        const opcode = new Mul(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(20);
    });
});