import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Return extends Opcode {
    
    execute(context: IExecutionContext): void {
        context.finished = true; // Request completion.
    }
}
