import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Complement extends Opcode {
    
    execute(context: IExecutionContext): void {
        const value = this.popInt(context);
        this.pushInt(context, ~value);
    }
}
