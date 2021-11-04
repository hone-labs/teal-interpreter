import { Div } from "../../lib/opcodes/div";

describe("div opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "/",
            operands: [],
            
        };
        const context: any = {
            stack: [
                BigInt(10), 
                BigInt(2),
            ],
        };
        const opcode = new Div(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(5);
    });
});