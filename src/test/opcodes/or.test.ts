import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Or } from "../../lib/opcodes/or";

describe("or opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "||",
            operands: [],            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)),
                makeBigInt(BigInt(0)), 
            ],
        };
        const opcode = new Or(token, opcodeDefs["||"]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });
});