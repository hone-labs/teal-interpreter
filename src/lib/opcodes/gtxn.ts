import { Opcode } from "../opcode";
import { IExecutionContext, ITypedValue } from "../context";

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

        this.txnIndex = Number(this.parseIntOperand(0));
        this.fieldName = this.token.operands[1];
    }
    
    async execute(context: IExecutionContext): Promise<void> {

        if (this.txnIndex < 0) {
            throw new Error(`Transaction index for ${this.opcodeDef} is ${this.txnIndex}, it should be zero or greater.`);
        }

        const fieldPath = `gtxn.${this.txnIndex}.${this.fieldName}`;
        const value = await context.requireValue(fieldPath, this.token);
        context.stack.push(value);
    }
}
