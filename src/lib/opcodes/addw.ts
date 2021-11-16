import { IExecutionContext } from "../context";
import { Binary } from "./binary-operator";

export class Addw extends Binary {
    
    execute(context: IExecutionContext): void {
        let result = this.a + this.b;
        const maxUint64 = BigInt("0xFFFFFFFFFFFFFFFF");
        
        if (result > maxUint64) {
            result -= maxUint64;
            this.pushInt(context, BigInt(1));
            this.pushInt(context, result - BigInt(1));
        } 
        else {
            this.pushInt(context, BigInt(0));
            this.pushInt(context, result);
        }              
    }
}
