import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Global } from "../../lib/opcodes/global";

describe("global opcode", () => {

    it ("can execute", async () => {

        const token: any = {
            operands: [
                "MinBalance"
            ],
        };
        const context: any = {
            stack: [],
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`globals.MinBalance`);

                return makeBigInt(BigInt(18));               
            },
        };
        
        const opcode = new Global(token, opcodeDefs.global);
        opcode.validateOperand(); // Parses the operand.
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(18);
    });

});