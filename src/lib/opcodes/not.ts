import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Not extends Opcode {
    
    execute(context: IExecutionContext): void {
        const value = this.popInt(context);
        this.pushInt(context, value == BigInt(0) ? BigInt(1) : BigInt(0));
    }
}
