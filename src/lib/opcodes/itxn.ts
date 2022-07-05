import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Itxn extends Opcode {

    //
    // The field to be pulled from the current transaction.
    //
    private fieldName!: string;
    
    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
    }
    
    execute(context: IExecutionContext): void {

        if (context.submittedItxns === undefined || context.submittedItxns.length === 0) {
            throw new Error(`No inner transaction has been submited.`);
        }
        
        const value = context.submittedItxns[context.submittedItxns.length-1][this.fieldName];
        if (value === undefined) {
            throw new Error(`Field "${this.fieldName}" not found in the last innner transaction..`)
        }

        if (Array.isArray(value)) {
            throw new Error(`Expected field "${this.fieldName}" not to be an array when used with opcode ${this.token.opcode}.`);
        }

        context.stack.push(value);
    }
}
