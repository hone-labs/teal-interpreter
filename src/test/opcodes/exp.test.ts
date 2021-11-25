import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Exp } from "../../lib/opcodes/exp";

describe("exp opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(4)), 
                makeBigInt(BigInt(2)),
            ],
        };
        const opcode = new Exp(token, opcodeDefs["+"]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(context.stack[0].type === "bigint");
        expect(Number(context.stack[0].value)).toEqual(16);
    });
});