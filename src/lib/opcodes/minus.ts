import { IToken } from "../token";
import { IExecutionContext } from "../context";
import { Binary } from "./binary-operator";

export class Minus extends Binary {
   
    execute(context: IExecutionContext): void {
        context.stack.push(this.a - this.b);
    }
}
