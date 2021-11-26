import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { ItxnField } from "../../lib/opcodes/itxn_field";

describe("itxn_field opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "Something"
            ],
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(42)),
            ],
            itxn: {
            },
        };
        const opcode = new ItxnField(token, opcodeDefs.itxn_field);
        opcode.validateOperand();
        opcode.execute(context);

        expect(Number(context.itxn.Something.value)).toEqual(42);
    });

});