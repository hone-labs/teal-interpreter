import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Select extends Opcode {

    execute(context: IExecutionContext): void {
        const c = this.popInt(context);
        const b = context.stack.pop()!;
        const a = context.stack.pop()!;
        if (c != BigInt(0)) {
            context.stack.push(b);
        }
        else {
            context.stack.push(a);
        }
    }
}
