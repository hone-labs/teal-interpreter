import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Gtxns extends Opcode {

    //
    // The index of the specified transaction.
    //
    private txnIndex!: number;

    //
    // The field to be pulled from the specified transaction.
    //
    private fieldName!: string;
    
    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
    }

    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        this.txnIndex = Number(this.popInt(context));
        if (this.txnIndex < 0) {
            throw new Error(`Transaction index supplied to ${this.opcodeDef} is ${this.txnIndex}, it should be zero or greater.`);
        }

        if (this.txnIndex >= context.txns.length) {
            throw new Error(`Transaction index ${this.txnIndex} is outside of the bounds of transactions supplied in your configuration.`);
        }
    }
    
    execute(context: IExecutionContext): void {

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
