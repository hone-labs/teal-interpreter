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
    
    execute(context: IExecutionContext): void {
        
        const value = context.globals[this.globalName];
        if (value === undefined) {
            throw new Error(`Global "${this.globalName}" has not been provided, please adjust your configuration to include this global field.`)
        }

        if (Array.isArray(value)) {
            throw new Error(`Expected global "${this.globalName}" not to be an array when used with opcode ${this.token.opcode}.`);
        }

        context.stack.push(value);
    }
}
