import { Opcode } from "../opcode";
import { IExecutionContext, makeBytes } from "../context";

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
        context.stack.push(makeBytes(context.bytecblock[this.blockIndex!]));
    }
}
