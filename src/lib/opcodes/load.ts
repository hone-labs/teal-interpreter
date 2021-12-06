import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Load extends Opcode {
   
    //
    // The scratch position parsed from operands.
    //
    private position!: number;

    validateOperand(): void {
        super.validateOperand();

        this.position = Number(this.parseIntOperand(0));
        if (this.position < 0 || this.position >= 255) {
            throw new Error(`Invalid position ${this.position} in scratch spaced was requested, this value should be 0 or greater and less than 255.`);
        }
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(context.scratch[this.position]);
    }
}
