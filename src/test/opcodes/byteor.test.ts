import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { ByteOr } from "../../lib/opcodes/byteor";

describe("b| opcode", () => {

    it ("can execute", () => {

        const token: any = {};        
        const opcode = new ByteOr(token, opcodeDefs["b|"]);

        const context: any = {
            stack: [
                makeBytes(Buffer.from("01", "hex")),
                makeBytes(Buffer.from("10", "hex")),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);
        
        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0].value)).toEqual([ 17 ]);
    });

});