import { opcodeDefs } from "../../lib/opcodes";
import { ItxnSubmit } from "../../lib/opcodes/itxn_submit";

describe("itxn_submit opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new ItxnSubmit(token, opcodeDefs.itxn_submit);
        
        const itxnInProgress = {};
        const context: any = {
            itxn: itxnInProgress,
        };
        opcode.execute(context);

        expect(context.submittedItxns.length).toEqual(1);
        expect(context.submittedItxns[0]).toEqual(itxnInProgress);

        expect(context.itxn).toBeUndefined();
    });

    it ("throws when inner transaction is not started", () => {

        const token: any = {};
        const opcode = new ItxnSubmit(token, opcodeDefs.itxn_submit);
        
        const context: any = {};
        expect(() => opcode.execute(context)).toThrow();
    });
});