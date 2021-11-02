import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Err extends Opcode {
    
    constructor(token: IToken) {
        super(token, 0, 0);
    }
    
    execute(context: IExecutionContext): void {
        throw new Error(`Program triggered error using "err" opcode.`);
    }
}
