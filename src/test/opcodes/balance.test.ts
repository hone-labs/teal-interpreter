import { makeBigInt, makeBytes } from "../../lib/context";
import { stringToBytes } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { Balance } from "../../lib/opcodes/balance";

describe("balance opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new Balance(token, opcodeDefs.balance);

        const context: any = {
            accounts: {
                AAAA: {
                    balance: 12,
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
        const opcode = new Balance(token, opcodeDefs.balance);

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

    it("throws when balance is not set", () => {
        
        const token: any = {};
        const opcode = new Balance(token, opcodeDefs.balance);

        const context: any = {
            accounts: {
                AAAA: {
                    // Balance is not set.
                },
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });
});