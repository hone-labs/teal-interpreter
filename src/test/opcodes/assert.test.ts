import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Assert } from "../../lib/opcodes/assert";

describe("assert opcode", () => {

    it ("assert passes with non zero value on the stack", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(3)), 
            ],
        };
        
        const opcode = new Assert(token, opcodeDefs.assert);
        opcode.execute(context);

        expect(context.stack.length).toEqual(0);
    });

    it ("assert fails with zero value on the stack", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt(0)), 
            ],
        };
        
        const opcode = new Assert(token, opcodeDefs.assert);
        expect(() => opcode.execute(context)).toThrow();
    });    

    it ("assert fails with non-bigint on the stack", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBytes(new Uint8Array([1, 2])),
            ],
        };
        
        const opcode = new Assert(token, opcodeDefs.assert);
        expect(() => opcode.execute(context)).toThrow();
    });        
});