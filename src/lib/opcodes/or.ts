import { IExecutionContext, makeBigInt } from "../context";
import { Binary } from "./binary-operator";

export class Or extends Binary {
    
    execute(context: IExecutionContext): void {
        context.stack.push(makeBigInt((this.a != BigInt(0) || this.b != BigInt(0)) ? BigInt(1) : BigInt(0)));
    }
}
