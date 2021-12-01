import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gtxna } from "../../lib/opcodes/gtxna";

describe("gtxna opcode", () => {

    it ("can execute", async () => {

        const token: any = {
            operands: [
                "0",
                "Something",
                "0",
            ],
        };
        const opcode = new Gtxna(token, opcodeDefs.gtxna);

        const context: any = {
            requireValueArray: (fieldPath: string) => {
                expect(fieldPath).toEqual(`gtxn.0.Something`);

                return [ makeBigInt(BigInt(42)) ];
            },
            stack: [],
        };
        opcode.validateOperand();
        opcode.validateContext(context);
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });
        
});