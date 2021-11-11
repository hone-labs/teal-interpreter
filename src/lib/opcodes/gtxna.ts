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
            throw new Error(`Transaction index ${this.txnIndex}, is outside the range of ${context.txns.length}, please adjust your configuration to include more transactions.`);
        }

        const txn = context.txns[this.txnIndex];        
        const array = txn[this.fieldName];
        if (array === undefined) {
            throw new Error(`Field "${this.fieldName}" has not been supplied with transaction ${this.txnIndex}, please adjust your configuration to include this field.`)
        }

        //todo: check that value is an array of typed values!

        if (!Array.isArray(array)) {
            throw new Error(`Expected field "${this.fieldName}" to contain an array for use with opcode ${this.token.opcode}."`);
        }

        //todo: check index within bounds.

        const value = array[this.fieldIndex];
        context.stack.push(value);
    }
}
