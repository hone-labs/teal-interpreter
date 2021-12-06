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
                expect(fieldPath).toEqual(`txn.Something.1`);

                return makeBigInt(BigInt(2));
            },
            stack: [],
        };
        opcode.validateOperand();
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(2);
    });

});