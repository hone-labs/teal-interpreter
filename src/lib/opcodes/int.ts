import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";


export class Int extends Opcode {
   

    //
    // The integer literal value parsed from operands.
    //
    private value!: number;

    constructor(token: IToken) {
        super(token, 1, 0);
    }
    
    validateOperand(): void {
        super.validateOperand();

        const operand = this.token.operands[0];
        this.value = parseInt(operand);
        if (Number.isNaN(this.value)) {
            throw new Error(`Failed to pass integer operand "${operand}" for opcode "${this.token.opcode}".`);
        }
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(BigInt(this.value!));        
    }
}
