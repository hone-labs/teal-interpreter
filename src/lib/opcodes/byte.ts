import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { stringToBytes } from "../convert";


export class Byte extends Opcode {
   
    //
    // The type of encoding.
    //
    private encoding?: string;

    // 
    // The value to be pushed on the stack.
    //
    private value!: string;

    constructor(token: IToken) {
        super(token, [1, 2], 0);
    }
    
    validateOperand(): void {
        super.validateOperand();

        if (this.token.operands.length === 1) {
            this.value = this.token.operands[0];
        }
        else {
            this.encoding = this.token.operands[0];
            this.value = this.token.operands[1]; //TODO: parse the operand based on the encoding.
        }
    }    

    execute(context: IExecutionContext): void {
        context.stack.push(stringToBytes(this.value)); //TODO: Support other encoding types.
    }
}
