import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class BInvert extends Opcode {
   
    execute(context: IExecutionContext): void {
        this.pushBytes(context, this.popBytes(context).map(v => 255 - v));
    }
}
