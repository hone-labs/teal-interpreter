import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { ByteAnd } from "../../lib/opcodes/byteand";

describe("b& opcode", () => {

    it ("can execute", () => {

        const token: any = {};        
        const opcode = new ByteAnd(token, opcodeDefs["b&"]);

        const context: any = {
            stack: [
                makeBytes(Buffer.from("11", "hex")),
                makeBytes(Buffer.from("10", "hex")),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);
        
        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0].value)).toEqual([ 16 ]);
    });

});