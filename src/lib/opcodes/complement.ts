import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class Complement extends Opcode {
    
    constructor(token: IToken) {
        super(token, 0, 1);
    }
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop()?.value as bigint;
        context.stack.push(makeBigInt(~value));
    }
}