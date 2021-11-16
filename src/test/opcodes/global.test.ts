import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Global } from "../../lib/opcodes/global";

describe("global opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "MinBalance"
            ],
        };
        const context: any = {
            stack: [],
            globals: {
                MinBalance: makeBigInt(BigInt(18)),
            },
        };
        
        const opcode = new Global(token, opcodeDefs.global);
        opcode.validateOperand(); // Parses the operand.
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(18);
    });

    it("throws when global does not exist", () => {

        const token: any = {
            operands: [
                "xxx"
            ],
        };
        const opcode = new Global(token, opcodeDefs.global);
        opcode.validateOperand();

        const context: any = {
            global: {
                // No globals.
            },
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

});