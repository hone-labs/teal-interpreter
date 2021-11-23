import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppGlobalGetEx } from "../../lib/opcodes/app_global_get_ex";

describe("app_global_get_ex opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppGlobalGetEx(token, opcodeDefs.app_global_get_ex);

        const context: any = {
            apps: {
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

    it ("returns zero for application not found", () => {

        const token: any = {};
        const opcode = new AppGlobalGetEx(token, opcodeDefs.app_global_get_ex);

        const context: any = {
            apps: {
                // Particular application not set.
            },            
            stack: [                
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it ("returns zero when global is not found", () => {
        
        const token: any = {};
        const opcode = new AppGlobalGetEx(token, opcodeDefs.app_global_get_ex);

        const context: any = {
            apps: {
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
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(0);
        expect(Number(context.stack[1]?.value)).toEqual(0);
    });    
});