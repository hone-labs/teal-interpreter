import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Sha512_256 } from "../../lib/opcodes/sha512_256";

describe("sha512_256 opcode", () => {

    it ("can execute", () => {

        const token: any = {};        
        const opcode = new Sha512_256(token, opcodeDefs.sha512_256);

        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4, 5])),
            ],
        };

        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            65, 108, 169, 188, 129, 249,  37,  81,
            162,  91, 228, 162, 163,  63, 230, 143,
            151,  41, 154,  40,  12,   3, 143, 249,
            154, 242, 103, 173,  89, 201, 154, 235
        ]);
    });
});