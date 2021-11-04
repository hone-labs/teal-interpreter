import { Btoi } from "../../lib/opcodes/btoi";

describe("btoi opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "btoi",
            operands: [],
        };
        const context: any = {
            stack: [
                new Uint8Array([
                    0, 0, 0, 0,
                    0, 0, 0, 3        
                ]),
            ],
        };
        const opcode = new Btoi(token);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0])).toEqual(3);
    });
});