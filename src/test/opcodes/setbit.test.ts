import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { SetBit } from "../../lib/opcodes/setbit";

describe("setbit opcode", () => {

    it ("can set bit on number", () => {

        const token: any = {};
        const opcode = new SetBit(token, opcodeDefs.setbit);

        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
                makeBigInt(BigInt(3)),
                makeBigInt(BigInt(1)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(8);
    });

    it ("can set bit from bytes", () => {

        const token: any = {};
        const opcode = new SetBit(token, opcodeDefs.setbit);

        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 0, 3, 4])),
                makeBigInt(BigInt(10)),
                makeBigInt(BigInt(1)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            1, 32, 3, 4
        ]);
    });
});
