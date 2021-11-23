import { makeBigInt, makeBytes } from "../../lib/context";
import { addressToBytes } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AppLocalGet } from "../../lib/opcodes/app_local_get";

describe("app_local_get opcode", () => {

    it ("can execute", () => {

        const token: any = {};
        const opcode = new AppLocalGet(token, opcodeDefs.app_local_get);

        const context: any = {
            accounts: {
                "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224": {
                    appLocals: {
                        "0": {
                           aLocal: makeBigInt(BigInt(3)),
                        },
                    },
                },
            },            
            stack: [                
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
                makeBytes(new Uint8Array(Buffer.from("aLocal"))),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(3);
    });
});