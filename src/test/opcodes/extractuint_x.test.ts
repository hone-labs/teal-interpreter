import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { ExtractUint_X } from "../../lib/opcodes/extractuint_x";

describe("extract_uintX opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new ExtractUint_X(token, opcodeDefs.extract_uint16, 2);

        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])),
                makeBigInt(BigInt(1)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(515);
    });

});
