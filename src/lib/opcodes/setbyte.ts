import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class SetByte extends Opcode {

    execute(context: IExecutionContext): void {
        const c = Number(this.popInt(context));
        const b = Number(this.popInt(context));
        const a = this.popBytes(context);
        a[b] = c;
        this.pushBytes(context, a);
    }
}
