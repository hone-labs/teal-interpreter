import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gtxns } from "../../lib/opcodes/gtxns";

describe("gtxns opcode", () => {

    it ("can execute", async () => {

        const token: any = {
            operands: [
                "Something"
            ],
        };
        const opcode = new Gtxns(token, opcodeDefs.gtxns);
        opcode.validateOperand();

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`gtxn.0.Something`);

                return makeBigInt(BigInt(42));
            },
            stack: [
                makeBigInt(BigInt(0)),
            ],
        };
        opcode.validateContext(context);
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });


});