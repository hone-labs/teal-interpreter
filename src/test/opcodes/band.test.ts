import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Band } from "../../lib/opcodes/band";

describe("bitwise and opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "&",
            operands: [],
            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(2)), 
                makeBigInt(BigInt(6)),
            ],
        };
        const opcode = new Band(token, opcodeDefs["&"]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(2);
    });
});