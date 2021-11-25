import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Args } from "../../lib/opcodes/args";

describe("args opcode", () => {

    it("can push args 0 on stack", () => {

        const token: any = {};
        const opcode = new Args(token, opcodeDefs.args);

        const context: any = {
            stack : [
                makeBigInt(BigInt(0)),
            ],
            args: [
                makeBytes(new Uint8Array([1, 2, 3, 4, 5])),
            ],
        };

        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            1, 2, 3, 4, 5
        ]);
    });

    it("can push args 1 on stack", () => {

        const token: any = {};
        const opcode = new Args(token, opcodeDefs.args);

        const context: any = {
            stack : [
                makeBigInt(BigInt(1)),
            ],
            args: [
                makeBytes(new Uint8Array([1, 2])),
                makeBytes(new Uint8Array([3, 4])),
            ],
        };

        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([3, 4,]);
    });

    it("throws when there is no arg for specified index", () => {

        const token: any = {};
        const opcode = new Args(token, opcodeDefs.args);

        const context: any = {
            stack : [
                makeBigInt(BigInt(0)),
            ],
            args: [
                // No arguments.
            ],
        };
        opcode.validateContext(context);
        expect(() => opcode.execute(context)).toThrow();
    });

});