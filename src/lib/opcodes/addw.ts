import { IExecutionContext, makeBigInt } from "../context";
import { Binary } from "./binary-operator";

export class Addw extends Binary {
    
    execute(context: IExecutionContext): void {
        let result = this.a + this.b;
        const maxUint64 = BigInt("0xFFFFFFFFFFFFFFFF");
        
        if (result > maxUint64) {
            result -= maxUint64;
            context.stack.push(makeBigInt(BigInt(1)));
            context.stack.push(makeBigInt(result - BigInt(1)));
        } 
        else {
            context.stack.push(makeBigInt(BigInt(0)));
            context.stack.push(makeBigInt(result));
        }              
    }
}
