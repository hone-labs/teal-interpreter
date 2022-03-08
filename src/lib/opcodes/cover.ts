import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Cover extends Opcode {

    //
    // The number of items above the item covered on the stack.
    //
    private n!: number;

    validateOperand() {
        super.validateOperand();

        this.n = Number(this.parseIntOperand(0));
    }
    

    execute(context: IExecutionContext): void {
        const top = context.stack.pop()!;
        context.stack.splice(context.stack.length - this.n, 0, top);
    }
}
