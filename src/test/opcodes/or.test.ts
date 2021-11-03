import { Or } from "../../lib/opcodes/or";

describe("or opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "&&",
            operands: [],            
        };
        const context: any = {
            stack: [
                BigInt(3),
                BigInt(0), 
            ],
        };
        const opcode = new Or(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(1);
    });
});