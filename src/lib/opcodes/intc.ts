import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class Intc extends Opcode {
   
    //
    // The block index parsed from operands.
    //
    private blockIndex!: number;

    validateOperand(): void {
        super.validateOperand();

        this.blockIndex = this.parseIntOperand(0);
    }    

    execute(context: IExecutionContext): void {
        context.stack.push(makeBigInt(context.intcblock[this.blockIndex!]));
    }
}
