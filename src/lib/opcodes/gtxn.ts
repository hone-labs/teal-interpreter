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
            throw new Error(`Transaction index should be greater than 0, instead got ${this.txnIndex}.`);
        }

        if (this.txnIndex >= context.txns.length) {
            throw new Error(`Transaction index should be within the boundary of the array. Expected less than ${context.txns.length}, intead got ${this.txnIndex}.`);

        }

        const txn = context.txns[this.txnIndex];
        const value = txn[this.fieldName];
        if (value === undefined) {
            throw new Error(`Field "${this.fieldName}" has not been supplied with current transaction, please adjust your configuration to include this field.`)
        }

        if (Array.isArray(value)) {
            throw new Error(`Expected field "${this.fieldName}" not to be an array when used with opcode ${this.token.opcode}.`);
        }

        context.stack.push(value);
    }
}
