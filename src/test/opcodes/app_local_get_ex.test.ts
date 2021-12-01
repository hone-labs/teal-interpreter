import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalGetEx } from "../../lib/opcodes/app_local_get_ex";

describe("app_local_get_ex opcode", () => {

    it ("can execute", async () => {

        const addr = "john";
        const appId = "2";
        const localName = "aLocal";
        const token: any = {};
        const opcode = new AppLocalGetEx(token, opcodeDefs.app_local_get_ex);

        const context: any = {
            requestValue: async (fieldPath: string) => {
                expect(fieldPath).toEqual(`accounts.${addr}.appLocals.${appId}.${localName}`);
                return makeBigInt(BigInt(3));
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from(localName))),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(3);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });

});