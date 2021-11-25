import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Loads } from "../../lib/opcodes/loads";

describe("loads opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new Loads(token, opcodeDefs.loads);

        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
            ],
            scratch: [
                makeBigInt(BigInt(3)),
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });

    it("throws when position is less than 0", () => {

        const token: any = {};        
        const opcode = new Loads(token, opcodeDefs.loads);
        const context: any = {
            stack: [
                makeBigInt(BigInt(-1)),
            ],
        };
        expect(() => opcode.validateContext(context)).toThrow();
    });

    it("throws when position is greater than 254", () => {

        const token: any = {};        
        const opcode = new Loads(token, opcodeDefs.loads);
        const context: any = {
            stack: [
                makeBigInt(BigInt(255)),
            ],
        };
        expect(() => opcode.validateContext(context)).toThrow();
    });
});