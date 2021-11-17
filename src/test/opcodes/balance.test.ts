import { makeBytes } from "../../lib/context";
import { addressToBytes } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { Balance } from "../../lib/opcodes/balance";

describe("balance opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new Balance(token, opcodeDefs.balance);

        const context: any = {
            accounts: {
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
                    balance: 12,
                },
            },            
            stack: [     
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(12);
    });

    it("throws when account is not found", () => {

        const token: any = {};
        const opcode = new Balance(token, opcodeDefs.balance);

        const context: any = {
            accounts: {
                // No account.
            },            
            stack: [                
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when balance is not set", () => {
        
        const token: any = {};
        const opcode = new Balance(token, opcodeDefs.balance);

        const context: any = {
            accounts: {
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
                    // Balance is not set.
                },
            },
            stack: [                
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });
});