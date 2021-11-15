import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppGlobalGetEx } from "../../lib/opcodes/app_global_get_ex";

describe("app_global_get_ex opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppGlobalGetEx(token, opcodeDefs.app_global_get_ex);

        const context: any = {
            applications: {
                "2": {
                    globals: {
                        aGlobal: makeBigInt(BigInt(4)),
                    },
                }
            },            
            stack: [                
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(4);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });

    it("throws when applications is not set", () => {

        const token: any = {};
        const opcode = new AppGlobalGetEx(token, opcodeDefs.app_global_get_ex);

        const context: any = {
            // No applications.
            stack: [                
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when particular application is not set", () => {

        const token: any = {};
        const opcode = new AppGlobalGetEx(token, opcodeDefs.app_global_get_ex);

        const context: any = {
            applictions: {
                // No applications.
            },
            stack: [                
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when globals is not set", () => {
        
        const token: any = {};
        const opcode = new AppGlobalGetEx(token, opcodeDefs.app_global_get_ex);

        const context: any = {
            applications: {
                "2": {
                    // Globals is not set.
                }
            },
            stack: [                
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when global is not set", () => {
        
        const token: any = {};
        const opcode = new AppGlobalGetEx(token, opcodeDefs.app_global_get_ex);

        const context: any = {
            applications: {
                "2": {
                    globals: {
                        // The particular global is not set.
                    },
                }
            },
            stack: [                
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });    
});