import { Opcode } from "../opcode";
import { IExecutionContext, ITypedValue } from "../context";

export class Stores extends Opcode {

    //
    // The value to set in scratch memory.
    //
    private value!: ITypedValue;
    
    //
    // The scratch position popped from the stack.
    //
    private position!: number;

    validateContext(context: IExecutionContext): void {
        super.validateContext(context);

        this.value = context.stack.pop()!;

        this.position = Number(this.popInt(context));
        if (this.position < 0 || this.position >= 255) {
            throw new Error(`Invalid position ${this.position} in scratch spaced was requested, this value should be 0 or greater and less than 255.`);
        }
    }
    
    execute(context: IExecutionContext): void {
        context.scratch[this.position] = this.value;
    }
}
