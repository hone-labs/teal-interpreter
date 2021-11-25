import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Stores } from "../../lib/opcodes/stores";

describe("load opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new Stores(token, opcodeDefs.stores);        

        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
                makeBigInt(BigInt(12)),
            ],
            scratch: [
                makeBigInt(BigInt(0)),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(Number(context.scratch[0]?.value)).toEqual(12);
    });

    it("throws when position is less than 0", () => {

        const token: any = {};
        const opcode = new Stores(token, opcodeDefs.stores);        

        const context: any = {
            stack: [
                makeBigInt(BigInt(-1)),
                makeBigInt(BigInt(12)),
            ],
        };
        expect(() => opcode.validateContext(context)).toThrow();
    });

    it("throws when position is greater than 254", () => {

        const token: any = {};
        const opcode = new Stores(token, opcodeDefs.stores);        

        const context: any = {
            stack: [
                makeBigInt(BigInt(255)),
                makeBigInt(BigInt(12)),
            ],
        };
        expect(() => opcode.validateContext(context)).toThrow();
    });
});