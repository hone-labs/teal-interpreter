import { Dup } from "../../lib/opcodes/dup";

describe("dup opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "dup",
            operands: [],
        };
        const context: any = {
            stack: [
                BigInt(3), 
            ],
        };
        const opcode = new Dup(token);
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[1])).toEqual(3);
    });
});