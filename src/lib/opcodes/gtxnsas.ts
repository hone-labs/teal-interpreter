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
    }
    
    async execute(context: IExecutionContext) {

        if (this.fieldArrayIndex < 0) {
            throw new Error(`Field array index should be greater than 0, instead found ${this.fieldArrayIndex}.`);
        }

        const fieldPath = `gtxn.${this.txnIndex}.${this.fieldName}.${this.fieldArrayIndex}`;
        const value = await context.requireValue(fieldPath, this.token);
        context.stack.push(value);
    }
}
