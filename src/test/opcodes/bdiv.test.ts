import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { BDiv } from "../../lib/opcodes/bdiv";

describe("bdiv opcode", () => {

    it ("can execute", () => {

        const token: any = {};        
        const opcode = new BDiv(token, opcodeDefs["b/"]);

        const context: any = {
            stack: [
                makeBytes(Buffer.from("06", "hex")),
                makeBytes(Buffer.from("03", "hex")),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0].value)).toEqual([ 2 ]);
    });

});