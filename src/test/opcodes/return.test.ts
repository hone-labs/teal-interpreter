import { opcodeDefs } from "../../lib/opcodes";
import { Return } from "../../lib/opcodes/return";

describe("return opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new Return(token, opcodeDefs.return);

        const context: any = {};
        opcode.execute(context);
        expect(context.finished).toEqual(true);
    });
});