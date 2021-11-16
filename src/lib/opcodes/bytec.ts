import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Bytec extends Opcode {
   
    //
    // The block index parsed from operands.
    //
    private blockIndex!: number;

    validateOperand(): void {
        super.validateOperand();

        this.blockIndex = this.parseIntOperand(0);
    }    

    execute(context: IExecutionContext): void {
        this.pushBytes(context, context.bytecblock[this.blockIndex!]);
    }
}
