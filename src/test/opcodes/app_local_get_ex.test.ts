import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalGetEx } from "../../lib/opcodes/app_local_get_ex";

describe("app_local_get_ex opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppLocalGetEx(token, opcodeDefs.app_local_get_ex);

        const context: any = {
            accounts: {
                AAAA: {
                    applications: {
                        "2": {
                            locals: {
                                aLocal: makeBigInt(BigInt(3)),
                            },
                        },
                    },
                },
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(3);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });

    it("throws when account is not found", () => {

        const token: any = {};
        const opcode = new AppLocalGetEx(token, opcodeDefs.app_local_get_ex);

        const context: any = {
            accounts: {
                // No account.
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when application is not found", () => {

        const token: any = {};
        const opcode = new AppLocalGetEx(token, opcodeDefs.app_local_get_ex);

        const context: any = {
            accounts: {
                AAAA: {
                    applications: {
                        // No applications.
                    },
                },
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when local is not set", () => {
        
        const token: any = {};
        const opcode = new AppLocalGetEx(token, opcodeDefs.app_local_get_ex);

        const context: any = {
            accounts: {
                AAAA: {
                    applications: {
                        "2": {
                            locals: {
                                // No local set.
                            },
                        },
                    },
                },
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });    
});