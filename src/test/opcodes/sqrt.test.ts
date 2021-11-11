import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Sqrt } from "../../lib/opcodes/sqrt";

describe("sqrt opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "sqrt",
            operands: [],
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(16)),
            ],
        };
        const opcode = new Sqrt(token, opcodeDefs.sqrt);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(4);
    });
});