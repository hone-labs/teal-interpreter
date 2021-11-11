import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext, makeBytes } from "../context";
import { IOpcodeDef } from "../opcodes";

export class Bytec_X extends Opcode {
   
    constructor(token: IToken, opcodeDef: IOpcodeDef, private constantIndex: number) {
        super(token, opcodeDef);
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(makeBytes(context.bytecblock[this.constantIndex]));
    }
}
