import { And } from "../../lib/opcodes/and";

describe("and opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "&&",
            operands: [],            
        };
        const context: any = {
            stack: [
                BigInt(3),
                BigInt(2), 
            ],
        };
        const opcode = new And(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(1);
    });
});