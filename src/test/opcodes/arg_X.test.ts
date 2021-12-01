import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Arg_X } from "../../lib/opcodes/arg_X";

describe("arg_X opcode", () => {

    it("can push arg on stack", async () => {

        const argIndex = 0;
        const token: any = {};
        const opcode = new Arg_X(token, opcodeDefs.arg_X, argIndex);

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`args.${argIndex}`);
                return makeBigInt(BigInt(12));
            },
            stack : [],
        };

        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(12);
    });

});