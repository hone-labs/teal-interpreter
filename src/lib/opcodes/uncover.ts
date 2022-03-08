import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Uncover extends Opcode {

    //
    // The number of items above the item covered on the stack.
    //
    private n!: number;

    validateOperand() {
        super.validateOperand();

        this.n = Number(this.parseIntOperand(0));
    }
    
    execute(context: IExecutionContext): void {
        const [ item ] = context.stack.splice(context.stack.length - this.n - 1, 1);
        context.stack.push(item);
    }
}
