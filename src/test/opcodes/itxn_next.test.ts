import { opcodeDefs } from "../../lib/opcodes";
import { ItxnNext } from "../../lib/opcodes/itxn_next";

describe("itxn_next opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new ItxnNext(token, opcodeDefs.itxn_next);
        
        const itxnInProgress = {};
        const context: any = {
            itxn: itxnInProgress,
        };
        opcode.execute(context);

        expect(context.submittedItxns.length).toEqual(1);
        expect(context.submittedItxns[0]).toEqual(itxnInProgress);
        expect(context.itxn).toEqual({});
        expect(context.itxn).not.toBe(itxnInProgress);
    });

    it ("throws when inner transaction is not started", () => {

        const token: any = {};
        const opcode = new ItxnNext(token, opcodeDefs.itxn_next);
        
        const context: any = {};
        expect(() => opcode.execute(context)).toThrow();
    });


});