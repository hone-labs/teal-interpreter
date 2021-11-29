import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppOptedIn } from "../../lib/opcodes/app_opted_in";

describe("app_opted_in opcode", () => {

    it ("returns 1 when opted in", async () => {

        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const account = {
            appsOptedIn: new Set<string>(["2"]),
        };        
        const token: any = {};
        const opcode = new AppOptedIn(token, opcodeDefs.app_opted_in);

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBigInt(BigInt(2)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });

    it ("returns 0 when not opted in", async () => {

        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const account = {
            appsOptedIn: new Set<string>(),
        };        
        const token: any = {};
        const opcode = new AppOptedIn(token, opcodeDefs.app_opted_in);

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBigInt(BigInt(2)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(0);
    });

});