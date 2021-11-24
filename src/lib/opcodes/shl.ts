import { IExecutionContext } from "../context";
import { Binary } from "./binary-operator";

export class Shl extends Binary {
    
    execute(context: IExecutionContext): void {
        this.pushInt(context, (this.a << this.b) % (BigInt(2) ** BigInt(64)));
    }
}
