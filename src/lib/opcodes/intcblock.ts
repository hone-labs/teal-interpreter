import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Intcblock extends Opcode {
   
    //
    // Block of constants to load.
    //
    private block: bigint[] = [];

    constructor(token: IToken) {
        super(token, undefined, 0);
    }
    
    validateOperand(): void {
        super.validateOperand();

        for (let i = 0; i < this.token.operands.length; ++i) {
            this.block.push(BigInt(this.parseIntOperand(i)));
        }
    }
    

    execute(context: IExecutionContext): void {
        context.intcblock = this.block;
    }
}
