import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Dig extends Opcode {

    //
    // The position on the stack to duplicate.
    //
    private stackPosition!: number;

    validateOperand() {
        super.validateOperand();

        this.stackPosition = Number(this.parseIntOperand(0));
    }

    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        const minStackSize = this.stackPosition + 1;
        if (context.stack.length < minStackSize) {
            throw new Error(`Found ${context.stack.length} values on the stack. This isn't enough for opcode "${this.token.opcode} ${this.stackPosition}".`);
        }
    }

    execute(context: IExecutionContext): void {
        context.stack.push(context.stack[context.stack.length-1-this.stackPosition]);
    }
}
