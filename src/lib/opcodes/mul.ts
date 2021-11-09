import { IExecutionContext, makeBigInt } from "../context";
import { Binary } from "./binary-operator";

export class Mul extends Binary {
    
    execute(context: IExecutionContext): void {
        context.stack.push(makeBigInt(this.a * this.b));
    }
}
