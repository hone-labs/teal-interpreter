import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Txna extends Opcode {

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
    
    async execute(context: IExecutionContext): Promise<void> {

        const value = await context.requireValueArray(`txn.${this.fieldName}`, this.token.opcode)

        if (this.fieldArrayIndex < 0) {
            throw new Error(`Field index should >= 0, instead found ${this.fieldArrayIndex}`);
        }

        if (this.fieldArrayIndex >= value.length) {
            throw new Error(`Field index ${this.fieldArrayIndex}, is outside the range of ${value.length}, please adjust your configuration to include this field index.`);
        }

        context.stack.push(value[this.fieldArrayIndex]);
    }
}
