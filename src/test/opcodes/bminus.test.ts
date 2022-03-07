import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { BMinus } from "../../lib/opcodes/bminus";

describe("bminus opcode", () => {

    it ("can execute", () => {

        const token: any = {};        
        const opcode = new BMinus(token, opcodeDefs["b-"]);

        const context: any = {
            stack: [
                makeBytes(Buffer.from("03", "hex")),
                makeBytes(Buffer.from("02", "hex")),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0].value)).toEqual([ 1 ]);
    });

});