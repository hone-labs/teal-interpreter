import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Mulw } from "../../lib/opcodes/mulw";

describe("mul opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(10)), 
                makeBigInt(BigInt(2)),
            ],
        };
        const opcode = new Mulw(token, opcodeDefs.mulw);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(0);
        expect(Number(context.stack[1]?.value)).toEqual(20);
    });
});