import {makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { MinBalance } from "../../lib/opcodes/min_balance";

describe("min_balance opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new MinBalance(token, opcodeDefs.min_balance);

        const context: any = {
            accounts: {
                AAAA: {
                    minBalance: 12,
                },
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
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
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when minBalance is not set", () => {
        
        const token: any = {};
        const opcode = new MinBalance(token, opcodeDefs.min_balance);

        const context: any = {
            accounts: {
                AAAA: {
                    // minBalance is not set.
                },
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });
});