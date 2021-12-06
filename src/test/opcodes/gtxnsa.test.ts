import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gtxnsa } from "../../lib/opcodes/gtxnsa";

describe("gtxnsa opcode", () => {

    it ("can execute", async () => {

        const token: any = {
            operands: [
                "Something",
                "0",
            ],
        };
        const opcode = new Gtxnsa(token, opcodeDefs.gtxnsa);
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