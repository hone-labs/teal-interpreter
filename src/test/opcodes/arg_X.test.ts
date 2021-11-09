import { Arg_X } from "../../lib/opcodes/arg_X";

describe("argx opcode", () => {

    it("can push arg 0 on stack", () => {

        const token: any = {
            opcode: "arg_0",
            operands: [],
        };
        const opcode = new Arg_X(token, 0);

        const context: any = {
            stack : [],
            args: [
                new Uint8Array([1, 2]),
            ],
        };

        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            1, 2
        ]);
    });

    it("can push arg 1 on stack", () => {

        const token: any = {
            opcode: "arg_1",
            operands: [],
        };
        const opcode = new Arg_X(token, 1);

        const context: any = {
            stack : [],
            args: [
                new Uint8Array([1, 2]),
                new Uint8Array([3, 4]),
            ],
        };

        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([3, 4,]);
    });

});