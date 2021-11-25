import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Expw } from "../../lib/opcodes/expw";

describe("expw opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(4)), 
                makeBigInt(BigInt(2)),
            ],
        };
        const opcode = new Expw(token, opcodeDefs.expw);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0].value)).toEqual(0);
        expect(Number(context.stack[1].value)).toEqual(16);
    });
});