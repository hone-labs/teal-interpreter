import { makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { Balance } from "../../lib/opcodes/balance";

describe("balance opcode", () => {

    it ("can execute", async () => {

        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const account = {
            balance: 12,            
        };        
        const token: any = {};
        const opcode = new Balance(token, opcodeDefs.balance);

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
            },
            stack: [     
                makeBytes(encodeAddress(addr)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(12);
    });

    it("throws when balance is not set", async () => {
        
        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const account = {
            // Balance is not set.
        };        
        const token: any = {};
        const opcode = new Balance(token, opcodeDefs.balance);

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
            ],
        };
        await expect(() => opcode.execute(context)).rejects.toThrow();
    });
});