import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { BZero } from "../../lib/opcodes/bzero";

describe("bzero opcode", () => {

    it ("can execute", () => {

        const token: any = {};        
        const opcode = new BZero(token, opcodeDefs.bzero);

        const context: any = {
            stack: [
                makeBigInt(BigInt(3))
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0].value)).toEqual([0, 0, 0]);
    });

});