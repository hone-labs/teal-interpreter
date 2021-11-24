import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Gloads extends Opcode {
   
    //
    // The index of the transaction.
    //
    private txnIndex!: number;

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

    validateContext(context: IExecutionContext) {
        this.txnIndex = Number(this.popInt(context));
        if (this.txnIndex < 0) {
            throw new Error(`Transaction group index operand of opcode ${this.token.operands} cannot be less than 0.`);
        }
    }

    execute(context: IExecutionContext): void {

        const scratch = context.txnSideEffects[this.txnIndex.toString()];
        if (scratch === undefined) {
            throw new Error(`Expected "txnSideEffects.${this.txnIndex}" in your configuration."`);
        }

        const value = scratch[this.position.toString()];
        if (value === undefined) {
            throw new Error(`Expected "txnSideEffects.${this.txnIndex}.${this.position}" in your configuration."`);
        }

        context.stack.push(value);
    }
}
