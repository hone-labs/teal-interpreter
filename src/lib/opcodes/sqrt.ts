import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class Sqrt extends Opcode {

    execute(context: IExecutionContext): void {
        const value = this.popInt(context);
        context.stack.push(makeBigInt(BigInt(Math.sqrt(Number(value)))));
    }
}
