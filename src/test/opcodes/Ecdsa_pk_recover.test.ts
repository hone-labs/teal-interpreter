import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Ecdsa_pk_recover } from "../../lib/opcodes/ecdsa_pk_recover";
import { ec as EC } from "elliptic";

describe("ecdsa_pk_recover opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "0",
            ],
        };
        const opcode = new Ecdsa_pk_recover(token, opcodeDefs.ecdsa_pk_recover);

        const hash = new Uint8Array([0, 1, 2, 3, 4, 5]);
        const ec = new EC('secp256k1');
        const key = ec.genKeyPair();        
        const sig = key.sign(hash);

        const context: any = {
            stack: [
                makeBytes(hash),
                makeBigInt(BigInt(sig.recoveryParam || 0)),
                makeBytes(sig.r.toBuffer()),
                makeBytes(sig.s.toBuffer()),
            ],
        };

        opcode.validateOperand();
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(context.stack[0].value).toEqual(key.getPublic().getX().toBuffer());
        expect(context.stack[1].value).toEqual(key.getPublic().getY().toBuffer());
    });
});