import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Log extends Opcode {

    execute(context: IExecutionContext): void {
        context.logState.push(this.popBytes(context));
    }
}
