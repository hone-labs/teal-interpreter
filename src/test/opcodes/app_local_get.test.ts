import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalGet } from "../../lib/opcodes/app_local_get";

describe("app_local_get opcode", () => {

    it ("can execute", async () => {

        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const localName = "aLocal";
        const account = {};        
        const token: any = {};
        const opcode = new AppLocalGet(token, opcodeDefs.app_local_get);

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
            },
            requestValue: async (fieldPath: string) => {
                expect(fieldPath).toEqual(`accounts.${addr}.appLocals.0.${localName}`);

                return makeBigInt(BigInt(3));
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBytes(new Uint8Array(Buffer.from(localName))),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });
});