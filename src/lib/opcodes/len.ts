import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class Len extends Opcode {
    
    constructor(token: IToken) {
        super(token, 0, 1);
    }
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop()?.value as Uint8Array;
        context.stack.push(makeBigInt(BigInt(value.length)));
    }
}
