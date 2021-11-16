import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Itob } from "../../lib/opcodes/itob";

describe("itob opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const context: any = {
            stack: [
                makeBigInt(BigInt("0x1234567812345678")),
            ],
        };
        const opcode = new Itob(token, opcodeDefs.itob);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Array.from(context.stack[0]?.value)).toEqual([
            18, 52, 86, 120,
            18, 52, 86, 120
        ]);
    });
});