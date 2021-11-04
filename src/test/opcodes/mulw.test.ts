import { Mulw } from "../../lib/opcodes/mulw";

describe("mul opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "mulw",
            operands: [],            
        };
        const context: any = {
            stack: [
                BigInt(10), 
                BigInt(2),
            ],
        };
        const opcode = new Mulw(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0])).toEqual(0);
        expect(Number(context.stack[1])).toEqual(0);
    });
});