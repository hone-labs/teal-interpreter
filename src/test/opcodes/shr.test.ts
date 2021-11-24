import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Shr } from "../../lib/opcodes/shr";

describe("shr opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(48)), 
                makeBigInt(BigInt(4)),
            ],
        };
        const opcode = new Shr(token, opcodeDefs["+"]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(context.stack[0].type === "bigint");
        expect(Number(context.stack[0].value)).toEqual(3);
    });
});