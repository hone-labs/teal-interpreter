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
            throw new Error(`Field "${this.fieldName}" not found with current transaction. Please "txn.${this.fieldName}" to your configuration to include this field.`)
        }

        if (Array.isArray(value)) {
            throw new Error(`Expected field "${this.fieldName}" not to be an array when used with opcode ${this.token.opcode}.`);
        }

        context.stack.push(value);
    }
}
