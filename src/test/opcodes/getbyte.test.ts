import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { GetByte } from "../../lib/opcodes/getbyte";

describe("getbyte opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new GetByte(token, opcodeDefs.getbyte);

        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])),
                makeBigInt(BigInt(2)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });

});
