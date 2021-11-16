import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Swap } from "../../lib/opcodes/swap";

describe("swap opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new Swap(token, opcodeDefs.swap);

        const context: any = {
            stack: [
                makeBigInt(BigInt(1)),
                makeBigInt(BigInt(2)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(2);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });
});
