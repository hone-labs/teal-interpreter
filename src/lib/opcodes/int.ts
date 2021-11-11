import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class Int extends Opcode {
   
    //
    // The integer literal value parsed from operands.
    //
    private value!: bigint;

    validateOperand(): void {
        super.validateOperand();

        this.value = this.parseBigIntOperand(0);
    }

    execute(context: IExecutionContext): void {
        context.stack.push(makeBigInt(this.value!));
    }
}
