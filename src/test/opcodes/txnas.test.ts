import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Txnas } from "../../lib/opcodes/txnas";

describe("txnas opcode", () => {

    it ("can execute", async () => {

        const token: any = {
            operands: [
                "Something",
            ],
        };
        const opcode = new Txnas(token, opcodeDefs.txnas);
        opcode.validateOperand();

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`txn.Something.0`);

                return makeBigInt(BigInt(8));
            },
            stack: [
                makeBigInt(BigInt(0)),
            ],
        };
        opcode.validateContext(context);
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(8);
    });

});