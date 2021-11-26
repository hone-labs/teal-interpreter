import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class ItxnField extends Opcode {

    //
    // The field to be set in the current inner transaction.
    //
    private fieldName!: string;
    
    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
    }
    
    execute(context: IExecutionContext): void {

        const value = context.stack.pop()!;
        context.itxn[this.fieldName] = value;
    }
}
