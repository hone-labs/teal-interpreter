import { makeBytes } from "../../lib/context";
import { Sha256 } from "../../lib/opcodes/sha256";

describe("sha256 opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "sha256",
            operands: [],
        };
        const opcode = new Sha256(token);

        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4, 5])),
            ],
        };

        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            116, 248,  31, 225, 103, 217, 155,
            76, 180,  29, 109,  12, 205, 168,
            34, 120, 202, 238, 159,  62,  47,
            37, 213, 229, 163, 147, 111, 243,
            220, 236,  96, 208
        ]);
    });
});