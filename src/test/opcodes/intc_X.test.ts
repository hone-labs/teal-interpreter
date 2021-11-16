import { opcodeDefs } from "../../lib/opcodes";
import { Intc_X } from "../../lib/opcodes/intc_X";

describe("intc_X opcode", () => {

    it ("can execute with index 0", () => {

        const token: any = {};
        const opcode = new Intc_X(token, opcodeDefs.intc_0, 0);

        const context: any = {
            stack: [],
            intcblock: [
                BigInt(1),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0].value)).toEqual(1);
    });

    it ("can execute with index 2", () => {

        const token: any = {};
        const opcode = new Intc_X(token, opcodeDefs.intc_2, 2);

        const context: any = {
            stack: [],
            intcblock: [
                BigInt(1),
                BigInt(2),
                BigInt(3),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });

});