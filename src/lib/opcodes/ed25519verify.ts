import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { encodeAddress, verifyBytes } from "algosdk";

export class Ed25519verify extends Opcode {
    
    execute(context: IExecutionContext): void {
        const pubkey = context.stack.pop()?.value as Uint8Array;
        const signature = context.stack.pop()?.value as Uint8Array;
        const data = context.stack.pop()?.value as Uint8Array;
        
        const addr = encodeAddress(pubkey);
        const isValid = verifyBytes(data, signature, addr);
        if (isValid) {
            this.pushInt(context, BigInt(1));
        } 
        else {
            this.pushInt(context, BigInt(0));
        }      
    }
}
