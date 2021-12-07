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
    
    async execute(context: IExecutionContext): Promise<void> {

        const value = await context.requireValue(`txn.${this.fieldName}`, this.token.opcode);
        context.stack.push(value);
    }
}
