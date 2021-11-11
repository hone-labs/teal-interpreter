import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Not } from "../../lib/opcodes/not";

describe("not opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "!",
            operands: [],
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)),
            ],
        };
        const opcode = new Not(token, opcodeDefs["!"]);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(0);
    });
});