import { Keccak256 } from "../../lib/opcodes/keccak256";

describe("keccak256 opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "sha256",
            operands: [],
        };
        const opcode = new Keccak256(token);

        const context: any = {
            stack: [
                new Uint8Array([1, 2, 3, 4, 5]),
            ],
        };

        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0])).toEqual([
            125, 135, 197, 234, 117, 247,  55, 139,
            183,   1, 228,   4, 197,   6,  57,  22,
             26, 243, 239, 246,  98, 147, 233, 243,
            117, 181, 241, 126, 181,   4, 118, 244            
        ]);
    });
});