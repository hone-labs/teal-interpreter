import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Intc_0 extends Opcode {
   
    constructor(token: IToken) {
        super(token, 0, 0);
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(context.intcblock[0]);
    }
}
