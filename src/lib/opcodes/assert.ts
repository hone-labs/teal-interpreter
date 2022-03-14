import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Assert extends Opcode {

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
        if (value.type !== "bigint") {
            throw new Error(`assert expects one bigint on the stack, instead found ${value.type} (line: ${this.token.lineNo})`);
        }

        if (value.value as bigint === BigInt(0)) {
            throw new Error(`assert expects a non-zero value on the stack (line: ${this.token.lineNo})`);
        }
    }
}
