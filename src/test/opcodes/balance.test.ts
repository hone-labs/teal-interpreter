import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { Balance } from "../../lib/opcodes/balance";

describe("balance opcode", () => {

    it ("can execute", async () => {

        const addr = "john";
        const token: any = {};
        const opcode = new Balance(token, opcodeDefs.balance);

        const context: any = {
            requireValue: async (fieldPath: string) => {
                expect(fieldPath).toEqual(`accounts.${addr}.balance`);
                return makeBigInt(BigInt(12));
            },
            stack: [     
                makeBytes(encodeAddress(addr)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(12);
    });

});