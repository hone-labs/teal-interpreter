import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Itxna extends Opcode {

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
        this.fieldArrayIndex = Number(this.parseIntOperand(1));
    }
    
    execute(context: IExecutionContext): void {

        if (context.submittedItxns === undefined || context.submittedItxns.length === 0) {
            throw new Error(`No inner transaction has been submited.`);
        }
        
        const value = context.submittedItxns[context.submittedItxns.length-1][this.fieldName];
        if (value === undefined) {
            throw new Error(`Array field "${this.fieldName}" not found under "lastItxn.${this.fieldArrayIndex}".`)
        }

        if (!Array.isArray(value)) {
            throw new Error(`Expected field "${this.fieldName}" to be an array when used with opcode ${this.token.opcode}.`);
        }

        if (this.fieldArrayIndex < 0) {
            throw new Error(`Field index should >= 0, instead found ${this.fieldArrayIndex}`);
        }

        if (this.fieldArrayIndex >= value.length) {
            throw new Error(`Field index ${this.fieldArrayIndex}, is outside the range of ${value.length}.`);
        }

        context.stack.push(value[this.fieldArrayIndex]);
    }
}
