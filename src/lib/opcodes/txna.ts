import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Txna extends Opcode {

    //
    // The index of the transaction to get the field of.
    //
    private txnIndex!: number;

    //
    // The field to be pulled from the specified transaction.
    //
    private fieldName!: string;
    
    validateOperand() {
        super.validateOperand();

        this.txnIndex = this.parseIntOperand(0);
        this.fieldName = this.token.operands[1];
    }
    
    execute(context: IExecutionContext): void {

        if (this.txnIndex < 0) {
            throw new Error(`Transaction index should >= 0, instead found ${this.txnIndex}`);
        }

        if (this.txnIndex >= context.txns.length) {
            throw new Error(`Transaction index ${this.txnIndex}, is outside the range of ${context.txns.length}, please adjust your configuration to include more transactions.`);
        }

        const txn = context.txns[this.txnIndex];        
        const value = txn[this.fieldName];
        if (value === undefined) {
            throw new Error(`Field "${this.fieldName}" has not been supplied with transaction ${this.txnIndex}, please adjust your configuration to include this field.`)
        }

        context.stack.push(value);
    }
}
