import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalPut } from "../../lib/opcodes/app_local_put";

describe("app_local_put opcode", () => {

    it ("can execute", async () => {

        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const account = {
            appLocals: {
                "0": {
                } as any,
            },
        };        
        const token: any = {};
        const opcode = new AppLocalPut(token, opcodeDefs.app_local_put);

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(0);
        expect(Number(account.appLocals["0"].aLocal.value)).toEqual(6);
    });

    it("creates app when not found", async () => {
        
        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const account = {
            appLocals: {} as any,
        };
        const token: any = {};
        const opcode = new AppLocalPut(token, opcodeDefs.app_local_put);

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(0);
        expect(Number(account.appLocals["0"].aLocal.value)).toEqual(6);
    });

});