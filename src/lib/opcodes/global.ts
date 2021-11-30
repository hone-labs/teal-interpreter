import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Global extends Opcode {

    //
    // The global to be pushed on the stack.
    //
    private globalName!: string;
    
    validateOperand() {
        super.validateOperand();

        this.globalName = this.token.operands[0];
    }
    
    async execute(context: IExecutionContext): Promise<void> {
        
        const value = await context.requireValue(`globals.${this.globalName}`, this.token.opcode)
        context.stack.push(value);
    }
}
