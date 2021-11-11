import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Concat } from "../../lib/opcodes/concat";

describe("concat opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2])),
                makeBytes(new Uint8Array([3, 4])),
            ],
        };
        const opcode = new Concat(token, opcodeDefs.concat);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([1, 2, 3, 4]);        
    });
});