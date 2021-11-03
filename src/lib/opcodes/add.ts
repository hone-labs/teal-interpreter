import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";


export class Add extends Opcode {
    
    constructor(token: IToken) {
        super(token, 0, 2);
    }
    
    execute(context: IExecutionContext): void {
        const b = context.stack.pop() as bigint;
        const a = context.stack.pop() as bigint;
        context.stack.push(a + b);
    }
}
