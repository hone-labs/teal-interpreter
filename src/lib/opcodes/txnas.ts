import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Txnas extends Opcode {

    //
    // The index of the transaction to get the field of.
    //
    private fieldArrayIndex!: number;

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

        this.fieldArrayIndex = Number(this.popInt(context));
    }
    
    async execute(context: IExecutionContext): Promise<void> {

        if (this.fieldArrayIndex < 0) {
            throw new Error(`Field index should >= 0, instead found ${this.fieldArrayIndex}`);
        }

        const value = await context.requireValue(`txn.${this.fieldName}.${this.fieldArrayIndex}`, this.token.opcode)
        context.stack.push(value);
    }
}
