import { IExecutionContext } from "../context";
import { Opcode } from "../opcode";

export class Bitlen extends Opcode {
    
    execute(context: IExecutionContext): void {

        const stackTop = context.stack.pop()!;
        const value = stackTop.value;
        if (stackTop.type === "bigint") {
            this.pushInt(context, (value === BigInt(0)) ? BigInt(0) : BigInt(value.toString(2).length));
        }
        else {
            const array = value as Uint8Array;
            if (array.length > 0) {
                this.pushInt(context, BigInt((array.length - 1) * 8 + array[0].toString(2).length));
            }
        }
    }
}
