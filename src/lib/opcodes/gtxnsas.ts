import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Gtxnsas extends Opcode {

    //
    // The index of the transaction to get the field of.
    //
    private txnIndex!: number;

    //
    // The field to be pulled from the specified transaction.
    //
    private fieldName!: string;

    //
    // The index in the field array.
    //
    private fieldArrayIndex!: number;
    
    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
    }

    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        this.fieldArrayIndex = Number(this.popInt(context));
        this.txnIndex = Number(this.popInt(context));
        if (this.txnIndex < 0) {
            throw new Error(`Transaction index should >= 0, instead found ${this.txnIndex}`);
        }

        if (this.txnIndex >= context.gtxn.length) {
            throw new Error(`Transaction index ${this.txnIndex}, is outside the range of ${context.gtxn.length} transactions provided in your configuration. Please add "txns" array to your configuration containing at least ${this.txnIndex+1} transactions.`);
        }

    }
    
    execute(context: IExecutionContext): void {
        
        const txn = context.gtxn[this.txnIndex];        
        const value = txn[this.fieldName];
        if (value === undefined) {
            throw new Error(`Field "${this.fieldName}" not found in with transaction ${this.txnIndex}, please add field "txns.${this.txnIndex}.${this.fieldName}" to your configuration to include this field.`)
        }

        if (!Array.isArray(value)) {
            throw new Error(`Expected field "${this.fieldName}" to be an array when used with opcode ${this.token.opcode}.`);
        }

        if (this.fieldArrayIndex < 0) {
            throw new Error(`Field array index should be greater than 0, instead found ${this.fieldArrayIndex}.`);
        }

        if (this.fieldArrayIndex >= value.length) {
            throw new Error(`Field array index is outside the bounds of the array. Expected an index less than ${value.length}, instead found ${this.fieldArrayIndex}.`);
        }

        context.stack.push(value[this.fieldArrayIndex]);
    }
}
