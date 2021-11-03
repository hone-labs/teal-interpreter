import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Not extends Opcode {
    
    constructor(token: IToken) {
        super(token, 0, 1);
    }
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop() as bigint;
        context.stack.push(Number(value) == 0 ? BigInt(1) : BigInt(0));
    }
}
