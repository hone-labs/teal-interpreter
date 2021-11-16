import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Pop } from "../../lib/opcodes/pop";

describe("pop opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)), 
            ],
        };
        const opcode = new Pop(token, opcodeDefs.pop);
        opcode.execute(context);

        expect(context.stack.length).toEqual(0);
    });
});