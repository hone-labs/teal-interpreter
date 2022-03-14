import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { IOpcodeDef } from "../opcodes";

export class Arg_X extends Opcode {

    constructor(token: IToken, opcodeDef: IOpcodeDef, private constantIndex: number) {
        super(token, opcodeDef);
    }
    
    async execute(context: IExecutionContext) {
        const value = await context.requireValue(`args.${this.constantIndex}`, this.token);
        context.stack.push(value);
    }
}
