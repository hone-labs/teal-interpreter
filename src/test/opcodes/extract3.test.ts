import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Extract3 } from "../../lib/opcodes/extract3";

describe("extract3 opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new Extract3(token, opcodeDefs.extract3);

        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])),
                makeBigInt(BigInt(1)),
                makeBigInt(BigInt(2)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([ 2, 3 ]);
    });

});
