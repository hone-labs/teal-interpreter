import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Arg extends Opcode {

    //
    // The parsed index operand.
    //
    private argIndex!: number;
    
    validateOperand() {
        super.validateOperand();

        this.argIndex = Number(this.parseIntOperand(0));
    }
    
    async execute(context: IExecutionContext) {

        const value = await context.requireValue(`args.${this.argIndex}`, this.token);
        context.stack.push(value);
    }
}
