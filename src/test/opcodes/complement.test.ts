import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Complement } from "../../lib/opcodes/complement";

describe("complement opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)),
            ],
        };
        const opcode = new Complement(token, opcodeDefs["~"]);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(-4); 
    });
});