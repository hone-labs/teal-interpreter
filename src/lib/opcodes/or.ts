import { IExecutionContext } from "../context";
import { Binary } from "./binary-operator";

export class Or extends Binary {
    
    execute(context: IExecutionContext): void {
        this.pushInt(context, (this.a != BigInt(0) || this.b != BigInt(0)) ? BigInt(1) : BigInt(0));
    }
}
