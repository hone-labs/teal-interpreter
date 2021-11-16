import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Addw } from "../../lib/opcodes/addw";

describe("addw opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)), 
                makeBigInt(BigInt(2)),
            ],
        };
        const opcode = new Addw(token, opcodeDefs.addw);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(0);
        expect(Number(context.stack[1]?.value)).toEqual(5);
    });
});