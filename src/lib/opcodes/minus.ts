import { IExecutionContext, makeBigInt } from "../context";
import { Binary } from "./binary-operator";

export class Minus extends Binary {
   
    execute(context: IExecutionContext): void {
        context.stack.push(makeBigInt(this.a - this.b));
    }
}
