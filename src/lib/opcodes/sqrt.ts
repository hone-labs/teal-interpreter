import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Sqrt extends Opcode {

    execute(context: IExecutionContext): void {
        const value = this.popInt(context);
        this.pushInt(context, BigInt(Math.sqrt(Number(value))));
    }
}
