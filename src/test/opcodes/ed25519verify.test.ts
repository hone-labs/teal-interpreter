import { makeBytes } from "../../lib/context";
import { addressToBytes, stringToBytes } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { Ed25519verify } from "../../lib/opcodes/ed25519verify";

describe("ed25519verify opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "ed25519verify",
            operands: [],
        };
        const opcode = new Ed25519verify(token, opcodeDefs.ed25519verify);

        const context: any = {
            stack: [
                makeBytes(stringToBytes("iZWMx72KvU6Bw6sPAWQFL96YH+VMrBA0XKWD9XbZOZI=")),
                makeBytes(stringToBytes("if8ooA+32YZc4SQBvIDDY8tgTatPoq4IZ8Kr+We1t38LR2RuURmaVu9D4shbi4VvND87PUqq5/0vsNFEGIIEDA==")),
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
            ],
        };

        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(0);
    });
});