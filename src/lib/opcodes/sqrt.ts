import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class Sqrt extends Opcode {

    constructor(token: IToken) {
        super(token, 0, 1);
    }
    
    execute(context: IExecutionContext): void {
        const value = this.popInt(context);
        context.stack.push(makeBigInt(BigInt(Math.sqrt(Number(value)))));
    }
}
