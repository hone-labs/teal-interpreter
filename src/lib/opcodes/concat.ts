import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Concat extends Opcode {

    execute(context: IExecutionContext): void {
        const b = this.popBytes(context);
        const a = this.popBytes(context);
        const result = new Uint8Array(a.length + b.length);
        result.set(a);
        result.set(b, a.length);
        this.pushBytes(context, result);
    }
}
