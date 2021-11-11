import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalGet } from "../../lib/opcodes/app_local_get";

describe("app_local_get opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppLocalGet(token, opcodeDefs.app_local_get);

        const context: any = {
            accounts: {
                AAAA: {
                    locals: {
                        aLocal: makeBigInt(BigInt(3)),
                    },
                },
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });

    it("throws when account is not found", () => {

        const token: any = {};
        const opcode = new AppLocalGet(token, opcodeDefs.app_local_get);

        const context: any = {
            accounts: {
                // No account.
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when locals is not set", () => {
        
        const token: any = {};
        const opcode = new AppLocalGet(token, opcodeDefs.app_local_get);

        const context: any = {
            accounts: {
                AAAA: {
                    // Locals is not set.
                },
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when local is not set", () => {
        
        const token: any = {};
        const opcode = new AppLocalGet(token, opcodeDefs.app_local_get);

        const context: any = {
            accounts: {
                AAAA: {
                    locals: {
                        // The particular local is not set.
                    }
                },
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });    
});