import { IToken } from "../../token";
import { Opcode } from "../../opcode";
import { IExecutionContext } from "../../context";

export class Pop extends Opcode {

    constructor(token: IToken) {
        super(token, 0, 1);
    }
    
    execute(context: IExecutionContext): void {
        context.stack.pop();
    }
}
