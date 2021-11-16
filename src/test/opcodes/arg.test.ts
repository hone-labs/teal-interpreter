import { makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Arg } from "../../lib/opcodes/arg";

describe("arg opcode", () => {

    it("can push arg 0 on stack", () => {

        const token: any = {
            operands: [
                "0"
            ],
        };
        const opcode = new Arg(token, opcodeDefs.arg);

        const context: any = {
            stack : [],
            args: [
                makeBytes(new Uint8Array([1, 2, 3, 4, 5])),
            ],
        };

        opcode.validateOperand();
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            1, 2, 3, 4, 5
        ]);
    });

    it("can push arg 1 on stack", () => {

        const token: any = {
            operands: [
                "1"
            ],
        };
        const opcode = new Arg(token, opcodeDefs.arg);

        const context: any = {
            stack : [],
            args: [
                makeBytes(new Uint8Array([1, 2])),
                makeBytes(new Uint8Array([3, 4])),
            ],
        };

        opcode.validateOperand();
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([3, 4,]);
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

    it("throws when there is no arg for specified index", () => {

        const token: any = {
            operands: [
                "0"
            ],
        };
        const opcode = new Arg(token, opcodeDefs.arg);
        opcode.validateOperand();

        const context: any = {
            stack : [],
            args: [
                // No arguments.
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

});