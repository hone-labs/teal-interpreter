import { opcodeDefs } from "../../lib/opcodes";
import { ItxnSubmit } from "../../lib/opcodes/itxn_submit";

describe("itxn_submit opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new ItxnSubmit(token, opcodeDefs.itxn_submit);
        
        const context: any = {
            itxn: {},
        };
        opcode.execute(context);

        expect(context.lastItxn).toEqual({});
        expect(context.itxn).toBeUndefined();
    });

    it ("throws when inner transaction is not started", () => {

        const token: any = {};
        const opcode = new ItxnSubmit(token, opcodeDefs.itxn_submit);
        
        const context: any = {};
        expect(() => opcode.execute(context)).toThrow();
    });


});