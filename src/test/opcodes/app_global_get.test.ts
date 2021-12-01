import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppGlobalGet } from "../../lib/opcodes/app_global_get";

describe("app_global_get opcode", () => {

    it ("can execute", async () => {

        const globalName = "aGlobal";
        const token: any = {};
        const opcode = new AppGlobalGet(token, opcodeDefs.app_global_get);

        const context: any = {
            requireValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`appGlobals.0.${globalName}`);

                return makeBigInt(BigInt(4));
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from(globalName))),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(4);
    });

});