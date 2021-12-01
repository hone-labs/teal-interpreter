import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gtxn } from "../../lib/opcodes/gtxn";

describe("gtxn opcode", () => {

    it ("can execute", async () => {

        const token: any = {
            operands: [
                "0",
                "Something",
            ],
        };
        const opcode = new Gtxn(token, opcodeDefs.gtxn);

        opcode.validateOperand();

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`gtxn.0.Something`);

                return makeBigInt(BigInt(42));
            },
            stack: [],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            operands: [
                "not-an-int",
                "Fee",
            ],
        };
        const opcode = new Gtxn(token, opcodeDefs.gtxn);
        expect(() => opcode.validateOperand()).toThrow();
    });

});