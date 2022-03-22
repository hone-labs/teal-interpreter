import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { stringify } from "../utils";

export class Assert extends Opcode {

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
        if (value.type !== "bigint") {
            this.raiseError(`assert expects one bigint on the stack, instead found ${value.type} (line: ${this.token.lineNo})\r\nStack:\r\n${stringify(context.stack)}`);
        }

        if (value.value as bigint === BigInt(0)) {
            this.raiseError(`assert expects a non-zero value on the stack (line: ${this.token.lineNo})\r\nStack:\r\n${stringify(context.stack)}`);
        }
    }
}
