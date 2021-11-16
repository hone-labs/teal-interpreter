import { IExecutionContext } from "../context";
import { Binary } from "./binary-operator";

export class Minus extends Binary {
   
    execute(context: IExecutionContext): void {
        const result = this.a - this.b;
        if (result < BigInt(0)) {
            throw new Error(`Subtraction underflow`);
        }
        this.pushInt(context, result);
    }
}
