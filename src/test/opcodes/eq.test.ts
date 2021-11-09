import { makeBigInt } from "../../lib/context";
import { Eq } from "../../lib/opcodes/eq";

describe("eq opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "==",
            operands: [],            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)),
                makeBigInt(BigInt(0)),
            ],
        };
        const opcode = new Eq(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(0);
    });
});