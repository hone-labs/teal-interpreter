import { decodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { Addr } from "../../lib/opcodes/addr";

describe("addr opcode", () => {

    it ("can execute", () => {

        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const token: any = {
            operands: [
                addr,
            ],
        };        
        const opcode = new Addr(token, opcodeDefs.addr);
        opcode.validateOperand(); // Parses the operand.

        const context: any = {
            stack: [],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(decodeAddress(context.stack[0]?.value)).toEqual(addr);
    });

});