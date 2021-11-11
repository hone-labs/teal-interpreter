import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Dup2 } from "../../lib/opcodes/dup2";

describe("dup2 opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(1)),
                makeBigInt(BigInt(2)),
            ],
        };
        const opcode = new Dup2(token, opcodeDefs.dup2);
        opcode.execute(context);

        expect(context.stack.length).toEqual(4);
        expect(Number(context.stack[2]?.value)).toEqual(1);
        expect(Number(context.stack[3]?.value)).toEqual(2);
    });
});