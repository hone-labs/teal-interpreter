import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Args extends Opcode {

    //
    // The parsed index operand.
    //
    private argIndex!: number;
    
    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        this.argIndex = Number(this.popInt(context));
    }
    
    async execute(context: IExecutionContext) {

        const value = await context.requireValue(`args.${this.argIndex}`, this.token.opcode);
        context.stack.push(value);
    }
}
