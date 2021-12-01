import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Args } from "../../lib/opcodes/args";

describe("args opcode", () => {

    it("can push arg on stack", async () => {

        const argIndex = 0;
        const token: any = {};
        const opcode = new Args(token, opcodeDefs.args);

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`args.${argIndex}`);
                return makeBigInt(BigInt(12));
            },
            stack : [
                makeBigInt(BigInt(argIndex)),
            ],
        };

        opcode.validateContext(context);
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(12);
    });

});