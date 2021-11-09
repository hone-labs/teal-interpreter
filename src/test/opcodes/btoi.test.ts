import { makeBytes } from "../../lib/context";
import { Btoi } from "../../lib/opcodes/btoi";

describe("btoi opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "btoi",
            operands: [],
        };
        const context: any = {
            stack: [
                makeBytes(new Uint8Array([
                    18, 52, 86, 120,
                    18, 52, 86, 120
                ])),
            ],
        };
        const opcode = new Btoi(token);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(context.stack[0]?.value === BigInt("0x1234567812345678")).toEqual(true);
    });

    it ("an empty input produces a zero", () => {

        const token: any = {
            opcode: "btoi",
            operands: [],
        };
        const context: any = {
            stack: [
                makeBytes(new Uint8Array([])),
            ],
        };
        const opcode = new Btoi(token);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(context.stack[0]?.value === BigInt(0)).toEqual(true);
    });
});