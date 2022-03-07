import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { BMod } from "../../lib/opcodes/bmod";

describe("bmod opcode", () => {

    it ("can execute", () => {

        const token: any = {};        
        const opcode = new BMod(token, opcodeDefs["b%"]);

        const context: any = {
            stack: [
                makeBytes(Buffer.from("09", "hex")),
                makeBytes(Buffer.from("02", "hex")),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0].value)).toEqual([ 1 ]);
    });

});