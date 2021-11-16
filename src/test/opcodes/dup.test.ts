import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Dup } from "../../lib/opcodes/dup";

describe("dup opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)),
            ],
        };
        const opcode = new Dup(token, opcodeDefs.dup);
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[1]?.value)).toEqual(3);
    });
});