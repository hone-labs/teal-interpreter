import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { IOpcodeDef } from "../opcodes";

export class Intc_X extends Opcode {
   
    constructor(token: IToken, opcodeDef: IOpcodeDef, private constantIndex: number) {
        super(token, opcodeDef);
    }
    
    execute(context: IExecutionContext): void {
        this.pushInt(context, context.intcblock[this.constantIndex]);
    }
}
