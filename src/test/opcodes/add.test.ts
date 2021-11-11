import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Add } from "../../lib/opcodes/add";

describe("add opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "+",
            operands: [],
            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)), 
                makeBigInt(BigInt(4)),
            ],
        };
        const opcode = new Add(token, opcodeDefs["+"]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(context.stack[0].type === "bigint");
        expect(Number(context.stack[0].value)).toEqual(7);
    });
});