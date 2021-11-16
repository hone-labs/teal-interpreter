import { IExecutionContext } from "../context";
import { Binary } from "./binary-operator";

export class Add extends Binary {
    
    execute(context: IExecutionContext): void {
        this.pushInt(context, this.a + this.b);
    }
}
