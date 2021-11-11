import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";
import { IOpcodeDef } from "../opcodes";

export class Intc_X extends Opcode {
   
    constructor(token: IToken, opcodeDef: IOpcodeDef, private constantIndex: number) {
        super(token, opcodeDef);
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(makeBigInt(context.intcblock[this.constantIndex]));
    }
}
