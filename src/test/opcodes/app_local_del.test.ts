import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalDel } from "../../lib/opcodes/app_local_del";

describe("app_local_del opcode", () => {

    it ("can execute", async () => {

        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
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
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
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