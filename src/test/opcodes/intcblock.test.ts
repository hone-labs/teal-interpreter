import { Intcblock } from "../../lib/opcodes/intcblock";

describe("intcblock opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "intcblock",
            operands: [
                "1",
                "2",
                "3",
            ],
        };
        
        const opcode = new Intcblock(token);
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
            opcode: "intcblock",
            operands: [
                "xxx"
            ],
        };
        const opcode = new Intcblock(token);

        expect(() => opcode.validateOperand()).toThrow();
    });

});