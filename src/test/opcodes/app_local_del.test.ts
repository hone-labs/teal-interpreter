import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalDel } from "../../lib/opcodes/app_local_del";

describe("app_local_del opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppLocalDel(token, opcodeDefs.app_local_del);

        const context: any = {
            accounts: {
                AAAA: {
                    locals: {
                        aLocal: makeBigInt(BigInt(2)),
                    },
                },
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(0);
        expect(context.accounts.AAAA.locals.aLocal).not.toBeDefined();
    });

    it("throws when account is not found", () => {

        const token: any = {};
        const opcode = new AppLocalDel(token, opcodeDefs.app_local_del);

        const context: any = {
            accounts: {
                // No account.
            },            
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

});