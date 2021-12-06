import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gtxnas } from "../../lib/opcodes/gtxnas";

describe("gtxnas opcode", () => {

    it ("can execute", async () => {

        const token: any = {
            operands: [
                "0",
                "Something",
            ],
        };
        const opcode = new Gtxnas(token, opcodeDefs.gtxnas);
        opcode.validateOperand();

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`gtxn.0.Something.0`);

                return makeBigInt(BigInt(42));
            },
            stack: [
                makeBigInt(BigInt(0))
            ],
        };
        opcode.validateContext(context);
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

});