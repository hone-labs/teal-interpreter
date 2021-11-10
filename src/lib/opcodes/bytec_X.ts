import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext, makeBytes } from "../context";

export class Bytec_X extends Opcode {
   
    constructor(token: IToken, private constantIndex: number) {
        super(token, 0, 0);
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(makeBytes(context.bytecblock[this.constantIndex]));
    }
}