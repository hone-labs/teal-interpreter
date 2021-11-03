import { Mul } from "../../lib/opcodes/mul";

describe("mul opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "*",
            operands: [],            
        };
        const context: any = {
            stack: [
                BigInt(10), 
                BigInt(2),
            ],
        };
        const opcode = new Mul(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(20);
    });
});