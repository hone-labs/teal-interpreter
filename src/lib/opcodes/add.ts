import { IExecuteResult } from "../..";
import { IToken } from "../../token";
import { Opcode } from "../../opcode";


export class Add extends Opcode {
    
    constructor(token: IToken) {
        super(token, 0, 2);
    }
    
    execute(context: IExecuteResult): void {
        const a = context.stack.pop() as bigint;
        const b = context.stack.pop() as bigint;
        context.stack.push(a + b);
    }
}
