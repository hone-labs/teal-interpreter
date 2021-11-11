import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalPut } from "../../lib/opcodes/app_local_put";

describe("app_local_put opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppLocalPut(token, opcodeDefs.app_local_put);

        const context: any = {
            accounts: {
                AAAA: {
                    locals: {
                    },
                },
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(0);
        expect(Number(context.accounts.AAAA.locals.aLocal.value)).toEqual(6);
    });

    it("throws when account is not found", () => {

        const token: any = {};
        const opcode = new AppLocalPut(token, opcodeDefs.app_local_put);

        const context: any = {
            accounts: {
                // No account.
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when locals is not set", () => {
        
        const token: any = {};
        const opcode = new AppLocalPut(token, opcodeDefs.app_local_put);

        const context: any = {
            accounts: {
                AAAA: {
                    // Locals is not set.
                },
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

});