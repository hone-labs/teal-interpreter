import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";


export class Arg extends Opcode {

    //
    // The parsed index operand.
    //
    private argIndex!: number;
    
    constructor(token: IToken) {
        super(token, 1, 0);
    }

    validateOperand() {
        super.validateOperand();

        this.argIndex = parseInt(this.token.operands[0]);

        if (Number.isNaN(this.argIndex)) {
            throw new Error(`Failed to pass integer index operand "${this.token}"" for opcode "arg"`);
        }
    }
    
    execute(context: IExecutionContext): void {
        if (this.argIndex < 0 || this.argIndex >= context.args.length) {
            throw new Error(`Invalid index "${this.argIndex}" provided to "arg" opcode. It is outside the range of ${context.args.length} arguments.`);
        }

        context.stack.push(context.args[this.argIndex]);
    }
}
