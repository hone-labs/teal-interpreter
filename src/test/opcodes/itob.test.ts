import { Itob } from "../../lib/opcodes/itob";

describe("itob opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "itob",
            operands: [],
        };
        const context: any = {
            stack: [
                BigInt(3) 
            ],
        };
        const opcode = new Itob(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0])).toEqual([
            0, 0, 0, 0,
            0, 0, 0, 3
        ]);
    });
});