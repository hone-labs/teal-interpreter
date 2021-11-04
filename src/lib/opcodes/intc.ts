import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Intc extends Opcode {
   
    //
    // The block index parsed from operands.
    //
    private blockIndex!: number;

    constructor(token: IToken) {
        super(token, 1, 0);
    }
    
    validateOperand(): void {
        super.validateOperand();

        this.blockIndex = this.parseIntOperand(0);
    }    

    execute(context: IExecutionContext): void {
        context.stack.push(context.intcblock[this.blockIndex!]);
    }
}
