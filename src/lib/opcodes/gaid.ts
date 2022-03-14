import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Gaid extends Opcode {
   
    //
    // The index of the transaction.
    //
    private txnIndex!: number;

    validateOperand(): void {
        super.validateOperand();

        this.txnIndex = Number(this.parseIntOperand(0));
        if (this.txnIndex < 0) {
            throw new Error(`Transaction group index operand of opcode ${this.token.operands} cannot be less than 0.`);
        }
    }

    async execute(context: IExecutionContext) {

        const value = await context.requireValue(`gaid.${this.txnIndex}`, this.token);
        context.stack.push(value);
    }
}
