import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Swap extends Opcode {

    execute(context: IExecutionContext): void {
        const b = context.stack.pop()!;
        const a = context.stack.pop()!;
        context.stack.push(b);
        context.stack.push(a);
    }
}
