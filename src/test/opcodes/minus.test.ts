import { Minus } from "../../lib/opcodes/minus";

describe("minus opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "+",
            operands: [],
        };
        const context: any = {
            stack: [
                BigInt(6), 
                BigInt(4),
            ],
        };
        const opcode = new Minus(token);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(2);
    });
});