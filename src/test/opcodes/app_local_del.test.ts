import { makeBigInt, makeBytes } from "../../lib/context";
import { addressToBytes } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalDel } from "../../lib/opcodes/app_local_del";

describe("app_local_del opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppLocalDel(token, opcodeDefs.app_local_del);

        const context: any = {
            accounts: {
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
                    locals: {
                        aLocal: makeBigInt(BigInt(2)),
                    },
                },
            },            
            stack: [                
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(0);
        expect(context.accounts["7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224"].locals.aLocal).not.toBeDefined();
    });

    it("throws when account is not found", () => {

        const token: any = {};
        const opcode = new AppLocalDel(token, opcodeDefs.app_local_del);

        const context: any = {
            accounts: {
                // No account.
            },            
            stack: [                
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
                makeBigInt(BigInt(6)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

});