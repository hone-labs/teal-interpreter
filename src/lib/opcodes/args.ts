import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Args extends Opcode {

    //
    // The parsed index operand.
    //
    private argIndex!: number;
    
    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        this.argIndex = Number(this.popInt(context)));
    }
    
    execute(context: IExecutionContext): void {
        if (this.argIndex < 0 || this.argIndex >= context.args.length) {
            throw new Error(`Invalid index "${this.argIndex}" provided to "${this.token.opcode}" opcode. It is outside the range of ${context.args.length} arguments.`);
        }

        context.stack.push(context.args[this.argIndex]);
    }
}
