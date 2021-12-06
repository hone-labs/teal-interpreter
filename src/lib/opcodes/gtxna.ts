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

        const fieldPath = `gtxn.${this.txnIndex}.${this.fieldName}`;
        const array = await context.requireValueArray(fieldPath, this.token.opcode);

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
