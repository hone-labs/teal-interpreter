import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";


export class Int extends Opcode {
   

    //
    // The integer literal value parsed from operands.
    //
    private value?: number;

    constructor(token: IToken) {
        super(token, 1, 0);
    }
    
    validateOperand(): void {
        super.validateOperand();

        const operand = this.token.operands[0];

        try {
            this.value = parseInt(operand);
        }
        catch {
            throw new Error(`Failed to parse integer operand to instruction "int" from operand ${operand}`);
        }
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(BigInt(this.value!));        
    }
}
