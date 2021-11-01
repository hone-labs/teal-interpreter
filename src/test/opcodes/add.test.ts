import { Add } from "../../lib/opcodes/add";

describe("add opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "+",
            operands: [],
        };
        const context: any = {
            stack: [
                BigInt(3), 
                BigInt(4),
            ],
        };
        const opcode = new Add(token);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(7);
    });
});