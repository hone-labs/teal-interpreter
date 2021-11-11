import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppGlobalPut } from "../../lib/opcodes/app_global_put";

describe("app_global_put opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppGlobalPut(token, opcodeDefs.app_global_put);

        const context: any = {
            application: {
                globals: {
                },
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(0);
        expect(Number(context.application.globals.aGlobal.value)).toEqual(6);
    });

    it("throws when account is not found", () => {

        const token: any = {};
        const opcode = new AppGlobalPut(token, opcodeDefs.app_global_put);

        const context: any = {
            // No applicaiton.
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when globals is not set", () => {
        
        const token: any = {};
        const opcode = new AppGlobalPut(token, opcodeDefs.app_global_put);

        const context: any = {
            application: {
                // Globals is not set.
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

});