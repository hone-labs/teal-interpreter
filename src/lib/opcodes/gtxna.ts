import { Opcode } from "../opcode";
import { IExecutionContext, ITypedValue } from "../context";

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

        this.txnIndex = Number(this.parseIntOperand(0));
        this.fieldName = this.token.operands[1];
        this.fieldIndex = Number(this.parseIntOperand(2));
    }
    
    async execute(context: IExecutionContext): Promise<void> {

        if (this.txnIndex < 0) {
            throw new Error(`Transaction index should >= 0, instead found ${this.txnIndex}`);
        }

        if (this.fieldIndex < 0) {
            throw new Error(`Field index should be greater than 0, instead got ${this.fieldIndex}.`);
        }

        const fieldPath = `gtxn.${this.txnIndex}.${this.fieldName}.${this.fieldIndex}`;
        const value = await context.requireValue(fieldPath, this.token.opcode);
        context.stack.push(value);
    }
}
