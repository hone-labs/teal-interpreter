import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Blt } from "../../lib/opcodes/blt";

describe("b< opcode", () => {

    it ("can execute", () => {

        const token: any = {};        
        const opcode = new Blt(token, opcodeDefs["b<"]);

        const context: any = {
            stack: [
                makeBytes(Buffer.from("A")),
                makeBytes(Buffer.from("B")),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0].value)).toEqual(1);
    });

});