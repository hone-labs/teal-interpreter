import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppGlobalPut } from "../../lib/opcodes/app_global_put";

describe("app_global_put opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppGlobalPut(token, opcodeDefs.app_global_put);

        const context: any = {
            appGlobals: {
                "0": {
                },            
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(0);
        expect(Number(context.appGlobals["0"].aGlobal.value)).toEqual(6);
    });

    it ("creates application when not found", () => {

        const token: any = {};
        const opcode = new AppGlobalPut(token, opcodeDefs.app_global_put);

        const context: any = {
            appGlobals: {
                // No application.
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(0);
        expect(Number(context.appGlobals["0"].aGlobal.value)).toEqual(6);
    });

});