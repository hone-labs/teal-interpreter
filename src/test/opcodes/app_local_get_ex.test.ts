import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalGetEx } from "../../lib/opcodes/app_local_get_ex";

describe("app_local_get_ex opcode", () => {

    it ("can execute", async () => {

        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const account = {
            appLocals: {
                "2": {
                    aLocal: makeBigInt(BigInt(3)),
                },
            },
        };        
        const token: any = {};
        const opcode = new AppLocalGetEx(token, opcodeDefs.app_local_get_ex);

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(3);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });

});