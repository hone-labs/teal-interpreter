import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";
import { encodeAddress, verifyBytes } from "algosdk";

export class Ed25519verify extends Opcode {
    
    constructor(token: IToken) {
        super(token, 0, 3);
    }
    
    execute(context: IExecutionContext): void {
        const pubkey = context.stack.pop()?.value as Uint8Array;
        const signature = context.stack.pop()?.value as Uint8Array;
        const data = context.stack.pop()?.value as Uint8Array;
        
        const addr = encodeAddress(pubkey);
        const isValid = verifyBytes(data, signature, addr);
        if (isValid) {
            context.stack.push(makeBigInt(BigInt(1)));
        } 
        else {
            context.stack.push(makeBigInt(BigInt(0)));
        }      
    }
}
