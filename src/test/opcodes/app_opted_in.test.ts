import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppOptedIn } from "../../lib/opcodes/app_opted_in";

describe("app_opted_in opcode", () => {

    it ("returns 1 when opted in", async () => {

        const addr = "john";
        const account = {
            appsOptedIn: ["2"],
        };        
        const token: any = {};
        const opcode = new AppOptedIn(token, opcodeDefs.app_opted_in);

        const context: any = {
            requireValue: async (fieldPath: string) => {
                expect(fieldPath).toEqual(`accounts.${addr}`);
                return account;
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBigInt(BigInt(2)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });

    it ("returns 0 when not opted in", async () => {

        const addr = "john";
        const account = {
            appsOptedIn: [],
        };        
        const token: any = {};
        const opcode = new AppOptedIn(token, opcodeDefs.app_opted_in);

        const context: any = {
            requireValue: async (fieldPath: string) => {
                expect(fieldPath).toEqual(`accounts.${addr}`);
                return account;
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBigInt(BigInt(2)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(0);
    });

});