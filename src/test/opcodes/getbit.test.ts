import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { GetBit } from "../../lib/opcodes/getbit";

describe("getbit opcode", () => {

    it ("can get bit from number", () => {

        const token: any = {};
        const opcode = new GetBit(token, opcodeDefs.getbit);

        const context: any = {
            stack: [
                makeBigInt(BigInt(6)),
                makeBigInt(BigInt(2)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });

    it ("can get bit from bytes", () => {

        const token: any = {};
        const opcode = new GetBit(token, opcodeDefs.getbit);

        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 255, 3, 4])),
                makeBigInt(BigInt(10)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });
});
