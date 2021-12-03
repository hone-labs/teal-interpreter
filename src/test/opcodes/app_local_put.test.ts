import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalPut } from "../../lib/opcodes/app_local_put";

describe("app_local_put opcode", () => {

    it ("can execute", async () => {

        const addr = "john";
        const account = {
            appLocals: {
                "0": {
                } as any,
            },
        };        
        const token: any = {};
        const opcode = new AppLocalPut(token, opcodeDefs.app_local_put);

        const context: any = {
            requireValue: async (fieldPath: string) => {
                expect(fieldPath).toEqual(`accounts.${addr}`);
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
        
        const addr = "john";
        const account = {
            appLocals: {} as any,
        };
        const token: any = {};
        const opcode = new AppLocalPut(token, opcodeDefs.app_local_put);

        const context: any = {
            requireValue: async (fieldPath: string) => {
                expect(fieldPath).toEqual(`accounts.${addr}`);
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