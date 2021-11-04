import { Band } from "../../lib/opcodes/band";

describe("bitwise and opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "|",
            operands: [],
            
        };
        const context: any = {
            stack: [
                BigInt(2), 
                BigInt(6),
            ],
        };
        const opcode = new Band(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(2);
    });
});