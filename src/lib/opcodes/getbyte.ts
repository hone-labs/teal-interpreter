import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class GetByte extends Opcode {

    execute(context: IExecutionContext): void {
        const b = Number(this.popInt(context));
        const a = this.popBytes(context);
        this.pushInt(context, BigInt(a[b]));
    }
}
