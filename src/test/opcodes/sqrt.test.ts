import { Sqrt } from "../../lib/opcodes/sqrt";

describe("sqrt opcode", () => {

    it ("can execute", () => {

        const token = {
            opcode: "sqrt",
            operands: [],
        };
        const context: any = {
            stack: [
                BigInt(16)
            ],
        };
        const opcode = new Sqrt(token);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(4);
    });
});