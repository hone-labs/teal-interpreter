import { Pop } from "../../lib/opcodes/pop";

describe("pop opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "pop",
            operands: [],
        };
        const context: any = {
            stack: [
                BigInt(3), 
            ],
        };
        const opcode = new Pop(token);
        opcode.execute(context);

        expect(context.stack.length).toEqual(0);
    });
});