import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Intc extends Opcode {
   
    //
    // The block index parsed from operands.
    //
    private blockIndex!: number;

    validateOperand(): void {
        super.validateOperand();

        this.blockIndex = Number(this.parseIntOperand(0));
    }    

    execute(context: IExecutionContext): void {
        this.pushInt(context, context.intcblock[this.blockIndex!]);

    }
}
