import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { SetByte } from "../../lib/opcodes/setbyte";

describe("setbyte opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new SetByte(token, opcodeDefs.setbyte);

        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])),
                makeBigInt(BigInt(2)),
                makeBigInt(BigInt(12)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            1,
            2,
            12,
            4,
        ]);
    });

});
