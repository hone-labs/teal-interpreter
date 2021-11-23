import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppGlobalGet } from "../../lib/opcodes/app_global_get";

describe("app_global_get opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppGlobalGet(token, opcodeDefs.app_local_get);

        const context: any = {
            apps: {
                "0": {
                    globals: {
                        aGlobal: makeBigInt(BigInt(4)),
                    },
                },            
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(4);
    });

    it("throws when application is not set", () => {

        const token: any = {};
        const opcode = new AppGlobalGet(token, opcodeDefs.app_local_get);

        const context: any = {
            // No application.
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when global is not set", () => {
        
        const token: any = {};
        const opcode = new AppGlobalGet(token, opcodeDefs.app_local_get);

        const context: any = {
            apps: {
                "0": {
                    globals: {
                        // The particular global is not set.
                    },
                },
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });    
});