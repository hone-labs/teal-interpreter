import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Band } from "../../lib/opcodes/band";

describe("exclusive or opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "^",
            operands: [],
            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)), 
                makeBigInt(BigInt(7)),
            ],
        };
        const opcode = new Band(token, opcodeDefs["^"]);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });
});