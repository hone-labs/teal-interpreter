import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { ec as EC } from "elliptic";

export class Ecdsa_pk_recover extends Opcode {
    
    //
    // The curve index parsed from first operand.
    ///
    private curveIndex!: number;
    
    validateOperand() {
        super.validateOperand();

        this.curveIndex = Number(this.parseIntOperand(0));
    }
    
    execute(context: IExecutionContext): void {

        const d = this.popBytes(context);
        const c = this.popBytes(context);
        const b = this.popInt(context);
        const a = this.popBytes(context);
    
        const ec = new EC('secp256k1');
        const pubKey = ec.recoverPubKey(a, { r: c, s: d }, Number(b));
        this.pushBytes(context, pubKey.getX().toBuffer());
        this.pushBytes(context, pubKey.getY().toBuffer());
    }
}
