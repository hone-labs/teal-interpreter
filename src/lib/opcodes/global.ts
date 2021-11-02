import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Global extends Opcode {

    //
    // The global to be pushed on the stack.
    //
    private globalName!: string;
    
    constructor(token: IToken) {
        super(token, 1, 0);
    }

    validateOperand() {
        super.validateOperand();

        this.globalName = this.token.operands[0];
    }
    
    execute(context: IExecutionContext): void {
        
        const value = context.globals[this.globalName];
        if (value === undefined) {
            throw new Error(`Global "${this.globalName}" has not been provided, please adjust your configuration to include this global field.`)
        }

        context.stack.push(value);
    }
}
