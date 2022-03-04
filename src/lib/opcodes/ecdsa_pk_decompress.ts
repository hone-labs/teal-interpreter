import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { ec as EC } from "elliptic";

export class Ecdsa_pk_decompress extends Opcode {
    
    //
    // The curve index parsed from first operand.
    ///
    private curveIndex!: number;
    
    validateOperand() {
        super.validateOperand();

        this.curveIndex = Number(this.parseIntOperand(0));
    }
    
    execute(context: IExecutionContext): void {

        const pubKey = this.popBytes(context);        
        const ec = new EC('secp256k1');
        const key = ec.keyFromPublic(pubKey, "hex").getPublic();
        this.pushBytes(context, key.getX().toBuffer());
        this.pushBytes(context, key.getY().toBuffer());
    }
}
