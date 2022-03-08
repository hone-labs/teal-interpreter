import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Extract3 extends Opcode {

    execute(context: IExecutionContext): void {
        const c = Number(this.popInt(context));
        const b = Number(this.popInt(context));
        const a = this.popBytes(context);
        this.pushBytes(context, a.slice(b, b + c));
    }
}
