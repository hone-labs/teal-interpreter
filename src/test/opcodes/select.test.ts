import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Select } from "../../lib/opcodes/select";

describe("select opcode", () => {

    it ("when condition is non-zero push b", () => {

        const token: any = {};
        const opcode = new Select(token, opcodeDefs.select);

        const context: any = {
            stack: [
                makeBigInt(BigInt(1)), // A
                makeBigInt(BigInt(2)), // B
                makeBigInt(BigInt(10)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(2);
    });

    it ("when condition is zero push a", () => {

        const token: any = {};
        const opcode = new Select(token, opcodeDefs.select);

        const context: any = {
            stack: [
                makeBigInt(BigInt(1)), // A
                makeBigInt(BigInt(2)), // B
                makeBigInt(BigInt(0)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });
});

