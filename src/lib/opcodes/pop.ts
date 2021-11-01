import { IExecuteResult } from "../..";
import { IToken } from "../../token";
import { Opcode } from "../../opcode";

export class Pop extends Opcode {

    constructor(token: IToken) {
        super(token, 0, 1);
    }
    
    execute(context: IExecuteResult): void {
        context.stack.pop();
    }
}
