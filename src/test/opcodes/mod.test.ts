import { makeBigInt } from "../../lib/context";
import { Mod } from "../../lib/opcodes/mod";

describe("mod opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "%",
            operands: [],
            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(4)), 
                makeBigInt(BigInt(3)),
            ],
        };
        const opcode = new Mod(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });
});