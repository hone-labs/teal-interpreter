import { Mod } from "../../lib/opcodes/mod";

describe("mod opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "%",
            operands: [],
            
        };
        const context: any = {
            stack: [
                BigInt(4), 
                BigInt(3),
            ],
        };
        const opcode = new Mod(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(1);
    });
});