import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppGlobalGetEx } from "../../lib/opcodes/app_global_get_ex";

describe("app_global_get_ex opcode", () => {

    it ("can execute", async () => {

        const appId = 2;
        const globalName = "aGlobal";
        const token: any = {};
        const opcode = new AppGlobalGetEx(token, opcodeDefs.app_global_get_ex);

        const context: any = {
            requestValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`appGlobals.${appId}.${globalName}`);

                return makeBigInt(BigInt(4));
            },
            stack: [                
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from(globalName))),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(4);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });

    it ("returns zero when global is not found", async () => {

        const token: any = {};
        const opcode = new AppGlobalGetEx(token, opcodeDefs.app_global_get_ex);

        const context: any = {
            requestValue: (fieldPath: string) => {
                return undefined; // Not found.
            },
            stack: [                
                makeBigInt(BigInt(2)),
                makeBytes(new Uint8Array(Buffer.from("aGlobal"))),
            ],
            
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(0);
        expect(Number(context.stack[1]?.value)).toEqual(0);
    });
});