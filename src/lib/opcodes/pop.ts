import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Pop extends Opcode {

    execute(context: IExecutionContext): void {
        context.stack.pop();
    }
}
