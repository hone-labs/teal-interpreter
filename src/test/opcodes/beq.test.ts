import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Beq } from "../../lib/opcodes/beq";

describe("b== opcode", () => {

    it ("can execute", () => {

        const token: any = {};        
        const opcode = new Beq(token, opcodeDefs["b=="]);

        const context: any = {
            stack: [
                makeBytes(Buffer.from("A")),
                makeBytes(Buffer.from("B")),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0].value)).toEqual(0);
    });

});