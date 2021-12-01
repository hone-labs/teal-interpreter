import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gtxnsas } from "../../lib/opcodes/gtxnsas";

describe("gtxnsas opcode", () => {

    it ("can execute", async () => {

        const token: any = {
            operands: [
                "Something",
            ],
        };
        const opcode = new Gtxnsas(token, opcodeDefs.gtxnsas);
        opcode.validateOperand();

        const context: any = {
            requireValueArray: (fieldPath: string) => {
                expect(fieldPath).toEqual(`gtxn.0.Something`);

                return [ makeBigInt(BigInt(42)) ];
            },
            stack: [
                makeBigInt(BigInt(0)),
                makeBigInt(BigInt(0)),
            ],
        };
        opcode.validateContext(context);
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

});