import { opcodeDefs } from "../../lib/opcodes";
import { Retsub } from "../../lib/opcodes/retsub";

describe("retsub opcode", () => {

    it("throws when nothing on the callstack", () => {

        const token: any = {};
        const opcode = new Retsub(token, opcodeDefs.b)

        const context: any = {
            callstack: [],
        };
        expect(() => opcode.validateContext(context)).toThrow();
    });

    it ("can execute", () => {

        const token: any = {};
        const opcode = new Retsub(token, opcodeDefs.b);

        const context: any = {
            callstack: [ 15 ],
        };
        expect(opcode.execute(context)).toEqual(15);
        expect(context.callstack.length).toEqual(0);
    });
});
