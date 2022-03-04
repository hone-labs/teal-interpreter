import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { BInvert } from "../../lib/opcodes/binvert";

describe("binvert opcode", () => {

    it ("can execute", () => {

        const token: any = {};        
        const opcode = new BInvert(token, opcodeDefs.binvert);

        const context: any = {
            stack: [
                makeBytes(Buffer.from("01", "hex")),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(context.stack[0].value).toEqual(Buffer.from("fe", "hex"));
    });

});