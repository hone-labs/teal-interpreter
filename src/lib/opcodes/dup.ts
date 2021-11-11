import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Dup extends Opcode {

    execute(context: IExecutionContext): void {
        context.stack.push(context.stack[context.stack.length-1]);
    }
}
