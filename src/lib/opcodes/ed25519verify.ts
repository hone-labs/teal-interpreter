import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { encodeAddress, verifyBytes } from "algosdk";

export class Ed25519verify extends Opcode {
    
    execute(context: IExecutionContext): void {
        const addr = encodeAddress(this.popBytes(context));
        const signature = this.popBytes(context);
        const data = this.popBytes(context);
        const isValid = verifyBytes(data, signature, addr);
        if (isValid) {
            this.pushInt(context, BigInt(1));
        } 
        else {
            this.pushInt(context, BigInt(0));
        }      
    }
}
