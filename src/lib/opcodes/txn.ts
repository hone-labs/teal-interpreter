import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Txn extends Opcode {

    //
    // The field to be pulled from the current transaction.
    //
    private fieldName!: string;
    
    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
    }
    
    execute(context: IExecutionContext): void {
        
        const value = context.txn[this.fieldName];
        if (value === undefined) {
            throw new Error(`Field "${this.fieldName}" has not been supplied with current transaction, please adjust your configuration to include this field.`)
        }

        context.stack.push(value);
    }
}
