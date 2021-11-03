import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Load extends Opcode {
   

    //
    // The scratch position parsed from operands.
    //
    private position!: number;

    constructor(token: IToken) {
        super(token, 1, 0);
    }
    
    validateOperand(): void {
        super.validateOperand();

        this.position = this.parseIntOperand(0);
        if (this.position < 0 || this.position >= 255) {
            throw new Error(`Invalid position ${this.position} in scratch spaced was requested, this value should be 0 or greater and less than 255.`);
        }
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(context.scratch[this.position]);
    }
}
