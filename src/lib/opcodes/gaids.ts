import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Gaids extends Opcode {
   
    //
    // The index of the transaction.
    //
    private txnIndex!: number;

    validateContext(context: IExecutionContext): void {
        super.validateContext(context);

        this.txnIndex = Number(this.popInt(context));
        if (this.txnIndex < 0) {
            throw new Error(`Transaction group index of opcode ${this.token.operands} cannot be less than 0.`);
        }
    }

    execute(context: IExecutionContext): void {

        const value = context.gaid[this.txnIndex.toString()];
        if (value === undefined) {
            throw new Error(`Expected "gaid.${this.txnIndex}" in your configuration."`);
        }

        context.stack.push(value);
    }
}
