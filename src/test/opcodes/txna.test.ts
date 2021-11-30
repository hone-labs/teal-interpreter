import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Txna } from "../../lib/opcodes/txna";

describe("txna opcode", () => {

    it ("can execute", async () => {

        const token: any = {
            operands: [
                "Something",
                "1",
            ],
        };
        const opcode = new Txna(token, opcodeDefs.txna);

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`txn.Something`);

                return [
                    makeBigInt(BigInt(1)),
                    makeBigInt(BigInt(2)),
                    makeBigInt(BigInt(3)),
                ];
            },
            stack: [],
        };
        opcode.validateOperand();
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(2);
    });

    it("throws when when index is outside range of fields", async () => {

        const token: any = {
            operands: [
                "Something",
                "0",
            ],
        };
        const opcode = new Txna(token, opcodeDefs.txna);
        opcode.validateOperand();

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`txn.Something`);

                return [
                    // No values.
                ];
            },
        };
     
        await expect(() => opcode.execute(context)).rejects.toThrow();
    });

});