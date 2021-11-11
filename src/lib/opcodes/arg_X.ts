import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { IOpcodeDef } from "../opcodes";

export class Arg_X extends Opcode {

    constructor(token: IToken, opcodeDef: IOpcodeDef, private constantIndex: number) {
        super(token, opcodeDef);
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(context.args[this.constantIndex]);
    }
}
