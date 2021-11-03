import { Ne } from "../../lib/opcodes/ne";

describe("ne opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "!=",
            operands: [],            
        };
        const context: any = {
            stack: [
                BigInt(3),
                BigInt(0), 
            ],
        };
        const opcode = new Ne(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(1);
    });
});