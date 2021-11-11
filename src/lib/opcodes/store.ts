import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Store extends Opcode {
  
    //
    // The scratch position parsed from operands.
    //
    private position!: number;

    validateOperand(): void {
        super.validateOperand();

        this.position = this.parseIntOperand(0);
        if (this.position < 0 || this.position >= 255) {
            throw new Error(`Invalid position ${this.position} in scratch spaced was requested, this value should be 0 or greater and less than 255.`);
        }
    }
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
        context.scratch[this.position] = value;
    }
}
