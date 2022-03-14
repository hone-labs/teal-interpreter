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
    }
    
    async execute(context: IExecutionContext): Promise<void> {
        const fieldPath = `gtxn.${this.txnIndex}.${this.fieldName}`;
        const value = await context.requireValue(fieldPath, this.token);
        context.stack.push(value);
    }
}
