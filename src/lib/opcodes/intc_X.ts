import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class Intc_X extends Opcode {
   
    constructor(token: IToken, private constantIndex: number) {
        super(token, 0, 0);
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(makeBigInt(context.intcblock[this.constantIndex]));
    }
}
