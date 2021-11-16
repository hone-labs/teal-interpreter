import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Len extends Opcode {
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop()?.value as Uint8Array;
        this.pushInt(context, BigInt(value.length));
    }
}
