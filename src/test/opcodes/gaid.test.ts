import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gaid } from "../../lib/opcodes/gaid";

describe("gaid opcode", () => {

    it ("can execute", async () => {

        const txnIndex = 0;
        const token: any = {
            operands: [
                txnIndex.toString(),
            ],
        };
        const opcode = new Gaid(token, opcodeDefs.gaid);
        opcode.validateOperand();

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`gaid.${txnIndex}`);
                return makeBigInt(BigInt(3));
            },
            stack: [],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            operands: [
                "xxx",
            ],
        };
        
        const opcode = new Gaid(token, opcodeDefs.gaid);
        expect(() => opcode.validateOperand()).toThrow();
    });

    it("throws when txn index operand is less than 0", () => {

        const token: any = {
            operands: [
                "-1",
            ],
        };
        
        const opcode = new Gaid(token, opcodeDefs.gaid);
        expect(() => opcode.validateOperand()).toThrow();
    });

});