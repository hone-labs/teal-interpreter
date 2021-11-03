import { IExecutionContext } from "../context";
import { Binary } from "./binary-operator";

export class And extends Binary {
    
    execute(context: IExecutionContext): void {
        context.stack.push((Number(this.a) != 0 && Number(this.b) != 0) ? BigInt(1) : BigInt(0));
    }
}
