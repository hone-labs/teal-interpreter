import { IExecutionContext } from "../context";
import { Binary } from "./binary-operator";

export class Expw extends Binary {
    
    execute(context: IExecutionContext): void {
        const result = this.a ** this.b;

        const maxUint64 = BigInt("0xFFFFFFFFFFFFFFFF");
        const low = result & maxUint64;
        const high = result >> BigInt('64');
    
        this.pushInt(context, high);
        this.pushInt(context, low);    
    }
}
