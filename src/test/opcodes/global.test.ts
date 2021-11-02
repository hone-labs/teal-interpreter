import { Global } from "../../lib/opcodes/global";

describe("global opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "global",
            operands: [
                "MinBalance"
            ],
        };
        const context: any = {
            stack: [],
            globals: {
                MinBalance: 18,
            },
        };
        
        const opcode = new Global(token);
        opcode.validateOperand(); // Parses the operand.
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(18);
    });

    it("throws when global does not exist", () => {

        const token: any = {
            opcode: "global",
            operands: [
                "xxx"
            ],
        };
        const opcode = new Global(token);
        opcode.validateOperand();

        const context: any = {
            global: {
                // No globals.
            },
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

});