import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gaids } from "../../lib/opcodes/gaids";

describe("gaids opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
            ],
            gaid: {
                "0": makeBigInt(BigInt(3)),
            },
        };
        const opcode = new Gaids(token, opcodeDefs.gaids);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });

    it("throws when txn index is less than 0", () => {

        const token: any = {};
        const opcode = new Gaids(token, opcodeDefs.gaids);

        const context: any = {
            stack: [
                makeBigInt(BigInt(-1)),
            ],
        };
        expect(() => opcode.validateContext(context)).toThrow();
    });

});