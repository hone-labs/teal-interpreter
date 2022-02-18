import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Assert extends Opcode {

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
        if (value.type !== "bigint") {
            throw new Error(`assert expectes one bigint on the stack, instead found ${value.type}`);
        }

        if (value.value as bigint === BigInt(0)) {
            throw new Error(`assert expects a non-zero value on the stack`);
        }
    }
}
