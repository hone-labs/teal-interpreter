import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Dup2 extends Opcode {

    execute(context: IExecutionContext): void {
        const a = context.stack[context.stack.length-2];
        const b = context.stack[context.stack.length-1];
        context.stack.push(a);
        context.stack.push(b);
    }
}
