import { IExecutionContext } from "../context";
import { Binary } from "./binary-operator";

export class Mulw extends Binary {
    
    execute(context: IExecutionContext): void {
        const result = this.a * this.b;
        const low = result & BigInt("0xFFFFFFFFFFFFFFFF");
        const high = result >> BigInt('64');
        this.pushInt(context, high);
        this.pushInt(context, low);    
    }
}
