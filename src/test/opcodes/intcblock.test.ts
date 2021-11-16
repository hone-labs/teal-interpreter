import { opcodeDefs } from "../../lib/opcodes";
import { Intcblock } from "../../lib/opcodes/intcblock";

describe("intcblock opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "1",
                "2",
                "3",
            ],
        };
        
        const opcode = new Intcblock(token, opcodeDefs.intcblock);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
        };
        opcode.execute(context);

        expect(context.intcblock.length).toEqual(3);
        expect(Number(context.intcblock[0])).toEqual(1);
        expect(Number(context.intcblock[1])).toEqual(2);
        expect(Number(context.intcblock[2])).toEqual(3);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            operands: [
                "xxx"
            ],
        };
        const opcode = new Intcblock(token, opcodeDefs.intcblock);

        expect(() => opcode.validateOperand()).toThrow();
    });

});