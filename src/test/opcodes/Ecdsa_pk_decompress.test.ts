import { makeBytes } from "../../lib/context";
import { encodeAddress, stringToBytes } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { Ecdsa_pk_decompress } from "../../lib/opcodes/ecdsa_pk_decompress";
import { ec as EC } from "elliptic";

describe("ecdsa_pk_decompress opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "0",
            ],
        };
        const opcode = new Ecdsa_pk_decompress(token, opcodeDefs.ecdsa_pk_decompress);

        const ec = new EC('secp256k1');

        const context: any = {
            stack: [
                makeBytes(Buffer.from("0250863AD64A87AE8A2FE83C1AF1A8403CB53F53E486D8511DAD8A04887E5B2352", "hex")),
            ],
        };

        opcode.validateOperand();
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(context.stack[0].value).toEqual(Buffer.from('50863AD64A87AE8A2FE83C1AF1A8403CB53F53E486D8511DAD8A04887E5B2352', "hex"));
        expect(context.stack[1].value).toEqual(Buffer.from('2CD470243453A299FA9E77237716103ABC11A1DF38855ED6F2EE187E9C582BA6', "hex"));
    });
});