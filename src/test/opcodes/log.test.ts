import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Log } from "../../lib/opcodes/log";

describe("log opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new Log(token, opcodeDefs.dup);

        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])),
            ],
            logState: [],
        };
        opcode.execute(context);

        expect(context.logState.length).toEqual(1);
        expect(context.logState[0]).toEqual(new Uint8Array([1, 2, 3, 4]));
    });
});