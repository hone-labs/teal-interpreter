import { Opcode } from "../opcode";
import { IExecutionContext, ITypedValue } from "../context";

export class Gtxnas extends Opcode {

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

        this.txnIndex = this.parseIntOperand(0);
        if (this.txnIndex < 0) {
            throw new Error(`Transaction index should >= 0, instead found ${this.txnIndex}`);
        }

        this.fieldName = this.token.operands[1];
    }

    validateContext(context: IExecutionContext) {
        super.validateContext(context);
        this.fieldArrayIndex = Number(this.popInt(context));
    }
    
    async execute(context: IExecutionContext): Promise<void> {

        if (this.txnIndex < 0) {
            throw new Error(`Transaction index should >= 0, instead found ${this.txnIndex}`);
        }

        const fieldPath = `gtxn.${this.txnIndex}.${this.fieldName}`;
        const array = await context.requireValueArray(fieldPath, this.token.opcode);

        if (this.fieldArrayIndex < 0) {
            throw new Error(`Field array index should be greater than 0, instead found ${this.fieldArrayIndex}.`);
        }

        if (this.fieldArrayIndex >= array.length) {
            throw new Error(`Field array index is outside the bounds of the array. Expected an index less than ${array.length}, instead found ${this.fieldArrayIndex}.`);
        }

        context.stack.push(array[this.fieldArrayIndex]);
    }
}
