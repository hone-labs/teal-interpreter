import { makeBytes } from "../../lib/context";
import { Len } from "../../lib/opcodes/len";

describe("len opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "len",
            operands: [],
        };
        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])), 
            ],
        };
        const opcode = new Len(token);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(4);
    });
});