import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Gtxn extends Opcode {

    //
    // The index of the transction in the current group.
    //
    private txnIndex!: number;

    //
    // The field to be pulled from the transaction.
    //
    private fieldName!: string;
    
    constructor(token: IToken) {
        super(token, 2, 0);
    }

    validateOperand() {
        super.validateOperand();

        this.txnIndex = this.parseIntOperand(0);
        this.fieldName = this.token.operands[1];
    }
    
    execute(context: IExecutionContext): void {
        
        const value = context.txns[this.txnIndex][this.fieldName];
        if (value === undefined) {
            throw new Error(`Field "${this.fieldName}" has not been supplied with current transaction, please adjust your configuration to include this field.`)
        }

        context.stack.push(value);
    }
}
