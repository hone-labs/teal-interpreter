import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Txn } from "../../lib/opcodes/txn";

describe("txn opcode", () => {

    it ("can execute", async () => {

        const token: any = {
            operands: [
                "Something"
            ],
        };
        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`txn.Something`);

                return makeBigInt(BigInt(42));
            },
            stack: [],
        };
        const opcode = new Txn(token, opcodeDefs.txn);
        opcode.validateOperand(); // Parses the operand.
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

});