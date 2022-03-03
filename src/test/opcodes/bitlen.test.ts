import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Bitlen } from "../../lib/opcodes/bitlen";

describe("bitlen opcode", () => {

    it ("can execute against big int", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(5)), 
            ],
        };
        
        const opcode = new Bitlen(token, opcodeDefs.bitlen);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]!.value)).toEqual(3);
    });

    it ("can execute against byte array", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2, 3, 4])),
            ],
        };
        
        const opcode = new Bitlen(token, opcodeDefs.bitlen);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]!.value)).toEqual(25);
    });
    
});