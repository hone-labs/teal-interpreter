import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Divmodw } from "../../lib/opcodes/divmodw";

describe("divmodw opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(6)), 
                makeBigInt(BigInt(0)),
                makeBigInt(BigInt(3)),
                makeBigInt(BigInt(0)),
            ],
        };
        const opcode = new Divmodw(token, opcodeDefs.addw);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(4);
        expect(Number(context.stack[0]!.value)).toEqual(0);
        expect(Number(context.stack[1]!.value)).toEqual(2);
        expect(Number(context.stack[2]!.value)).toEqual(0);
        expect(Number(context.stack[3]!.value)).toEqual(0);
    });
});