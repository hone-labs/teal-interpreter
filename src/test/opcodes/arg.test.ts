import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Arg } from "../../lib/opcodes/arg";

describe("arg opcode", () => {

    it("can push arg on stack", async () => {

        const argIndex = 0;
        const token: any = {
            operands: [
                argIndex.toString(),
            ],
        };
        const opcode = new Arg(token, opcodeDefs.arg);

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`args.${argIndex}`);
                return makeBigInt(BigInt(12));
            },
            stack : [],
        };

        opcode.validateOperand();
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(12);
    });

    it("throws when operand is not an int", () => {

        const token: any = {
            operands: [
                "xxx"
            ],
        };
        const opcode = new Arg(token, opcodeDefs.arg);
        expect(() => opcode.validateOperand()).toThrow();
    });

});