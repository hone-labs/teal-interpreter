import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Gaids extends Opcode {
   
    //
    // The index of the transaction.
    //
    private txnIndex!: number;

    validateContext(context: IExecutionContext): void {
        super.validateContext(context);

        this.txnIndex = Number(this.popInt(context));
        if (this.txnIndex < 0) {
            throw new Error(`Transaction group index of opcode ${this.token.operands} cannot be less than 0.`);
        }
    }

    async execute(context: IExecutionContext) {

        const value = await context.requireValue(`gaid.${this.txnIndex}`, this.token.opcode);
        context.stack.push(value);
    }
}
