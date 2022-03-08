import { ITypedValue, makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Cover } from "../../lib/opcodes/cover";

describe("cover opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "3",
            ]
        };
        const opcode = new Cover(token, opcodeDefs.cover);
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
            0, 4, 1, 2, 3
        ]);
    });

});
