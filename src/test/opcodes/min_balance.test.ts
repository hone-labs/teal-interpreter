import {makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { MinBalance } from "../../lib/opcodes/min_balance";

describe("min_balance opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new MinBalance(token, opcodeDefs.min_balance);

        const context: any = {
            accounts: {
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
                    minBalance: 12,
                },
            },            
            stack: [                
                makeBytes(encodeAddress("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(12);
    });

    it("throws when account is not found", () => {

        const token: any = {};
        const opcode = new MinBalance(token, opcodeDefs.min_balance);

        const context: any = {
            accounts: {
                // No account.
            },            
            stack: [                
                makeBytes(encodeAddress("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when minBalance is not set", () => {
        
        const token: any = {};
        const opcode = new MinBalance(token, opcodeDefs.min_balance);

        const context: any = {
            accounts: {
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
                    // minBalance is not set.
                },
            },
            stack: [                
                makeBytes(encodeAddress("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });
});