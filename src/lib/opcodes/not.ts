import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class Not extends Opcode {
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop()?.value as bigint;
        context.stack.push(makeBigInt(value == BigInt(0) ? BigInt(1) : BigInt(0)));
    }
}
