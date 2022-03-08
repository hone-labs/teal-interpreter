import { ITypedValue, makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Uncover } from "../../lib/opcodes/uncover";

describe("uncover opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "3",
            ]
        };
        const opcode = new Uncover(token, opcodeDefs.uncover);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(0)),
                makeBigInt(BigInt(1)),
                makeBigInt(BigInt(2)),
                makeBigInt(BigInt(3)),
                makeBigInt(BigInt(4)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(5);
        expect(context.stack.map((el: ITypedValue) => Number(el.value))).toEqual([
            0, 2, 3, 4, 1
        ]);
    });

});
