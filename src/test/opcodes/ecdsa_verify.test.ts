import { makeBytes } from "../../lib/context";
import { addressToBytes, stringToBytes } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { Ecdsa_verify } from "../../lib/opcodes/ecdsa_verify";

describe("ecdsa_verify opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "ecdsa_verify",
            operands: [
                "5",
            ],
        };
        const opcode = new Ecdsa_verify(token, opcodeDefs.ecdsa_verify);

        const context: any = {
            stack: [
                makeBytes(stringToBytes("iZWMx72KvU6Bw6sPAWQFL96YH+VMrBA0XKWD9XbZOZI=")),
                makeBytes(stringToBytes("iZWMx72KvU6Bw6sPAWQFL96YH+VMrBA0XKWD9XbZOZI=")),
                makeBytes(stringToBytes("if8ooA+32YZc4SQBvIDDY8tgTatPoq4IZ8Kr+We1t38LR2RuURmaVu9D4shbi4VvND87PUqq5/0vsNFEGIIEDA==")),
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
                makeBytes(addressToBytes("7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224")),
            ],
        };

        opcode.validateOperand();
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(0);
    });
});