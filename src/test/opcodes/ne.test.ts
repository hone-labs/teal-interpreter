import { makeBigInt } from "../../lib/context";
import { Ne } from "../../lib/opcodes/ne";

describe("ne opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "!=",
            operands: [],            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)),
                makeBigInt(BigInt(0)), 
            ],
        };
        const opcode = new Ne(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });
});