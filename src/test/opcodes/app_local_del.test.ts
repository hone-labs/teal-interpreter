import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalDel } from "../../lib/opcodes/app_local_del";

describe("app_local_del opcode", () => {

    it ("can execute", async () => {

        const addr = "john";
        const account = {
            appLocals: {
                "0": {
                    aLocal: makeBigInt(BigInt(2)),
                },
            },
        };        
        const token: any = {};
        const opcode = new AppLocalDel(token, opcodeDefs.app_local_del);

        const context: any = {
            requireValue: async (fieldPath: string) => {
                expect(fieldPath).toEqual(`accounts.${addr}`);
                return account;
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(0);
        expect(account.appLocals["0"].aLocal).not.toBeDefined();
    });

});