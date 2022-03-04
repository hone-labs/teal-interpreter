import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class BZero extends Opcode {
   
    execute(context: IExecutionContext): void {
        const a = this.popInt(context);
        this.pushBytes(context, new Uint8Array(Number(a)).fill(0));
    }
}
