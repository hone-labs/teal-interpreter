import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Gtxn extends Opcode {

    //
    // The index of the transction in the current group.
    //
    private txnIndex!: number;

    //
    // The field to be pulled from the transaction.
    //
    private fieldName!: string;
    
    validateOperand() {
        super.validateOperand();

        this.txnIndex = this.parseIntOperand(0);
        this.fieldName = this.token.operands[1];
    }
    
    execute(context: IExecutionContext): void {

        if (this.txnIndex < 0) {
            throw new Error(`Transaction index for ${this.opcodeDef} is ${this.txnIndex}, it should be zero or greater.`);
        }

        if (this.txnIndex >= context.txns.length) {
            throw new Error(`Transaction index ${this.txnIndex}, is outside the range of ${context.txns.length} transactions provided in your configuration. Please add "txns" array to your configuration containing at least ${this.txnIndex+1} transactions.`);
        }

        const txn = context.txns[this.txnIndex];
        const value = txn[this.fieldName];
        if (value === undefined) {
            throw new Error(`Field "${this.fieldName}" not found in current transaction, please add field "txn.${this.fieldName}" to your configuration to include this field.`)
        }

        if (Array.isArray(value)) {
            throw new Error(`Expected field "${this.fieldName}" not to be an array when used with opcode ${this.token.opcode}.`);
        }

        context.stack.push(value);
    }
}
