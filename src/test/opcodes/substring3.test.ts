import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Substring3 } from "../../lib/opcodes/substring3";

describe("substring3 opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new Substring3(token, opcodeDefs.substring3);

        const context: any = {
            stack: [                
                makeBytes(new Uint8Array([1, 2, 3, 4])),
                makeBigInt(BigInt(1)),
                makeBigInt(BigInt(3)),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([2, 3]);        
    });
});