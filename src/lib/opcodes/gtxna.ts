import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Gtxna extends Opcode {

    //
    // The index of the transaction to get the field of.
    //
    private txnIndex!: number;

    //
    // The field to be pulled from the specified transaction.
    //
    private fieldName!: string;

    //
    // The index in the field.
    //
    private fieldIndex!: number;
    
    validateOperand() {
        super.validateOperand();

        this.txnIndex = this.parseIntOperand(0);
        this.fieldName = this.token.operands[1];
        this.fieldIndex = this.parseIntOperand(2);
    }
    
    execute(context: IExecutionContext): void {

        if (this.txnIndex < 0) {
            throw new Error(`Transaction index should >= 0, instead found ${this.txnIndex}`);
        }

        if (this.txnIndex >= context.txns.length) {
            throw new Error(`Transaction index ${this.txnIndex}, is outside the range of ${context.txns.length} transactions provided in your configuration. Please add "txns" array to your configuration containing at least ${this.txnIndex+1} transactions.`);
        }

        const txn = context.txns[this.txnIndex];        
        const array = txn[this.fieldName];
        if (array === undefined) {
            throw new Error(`Field "${this.fieldName}" has not been supplied with transaction ${this.txnIndex}, please adjust your configuration to include this field.`)
        }

        if (!Array.isArray(array)) {
            throw new Error(`Expected field "${this.fieldName}" to contain an array for use with opcode ${this.token.opcode}."`);
        }

        if (this.fieldIndex < 0) {
            throw new Error(`Field index should be greater than 0, instead got ${this.fieldIndex}.`);
        }

        if (this.fieldIndex >= array.length) {
            throw new Error(`Field index should be within the boundary of the array. Expected less than ${array.length}, instead got ${this.fieldIndex}.`);

        }

        const value = array[this.fieldIndex];
        context.stack.push(value);
    }
}
