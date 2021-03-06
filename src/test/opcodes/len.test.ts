import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Len } from "../../lib/opcodes/len";

describe("len opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])), 
            ],
        };
        const opcode = new Len(token, opcodeDefs.len);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(4);
    });
});