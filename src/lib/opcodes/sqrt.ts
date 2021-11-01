import { IToken } from "../../token";
import { Opcode } from "../../opcode";
import { IExecutionContext } from "../../context";

export class Sqrt extends Opcode {

    constructor(token: IToken) {
        super(token, 0, 1);
    }
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
        context.stack.push(BigInt(Math.sqrt(Number(value))));
    }
}
