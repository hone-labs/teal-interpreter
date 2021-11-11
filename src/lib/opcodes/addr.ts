import { Opcode } from "../opcode";
import { IExecutionContext, makeBytes } from "../context";
import { addressToBytes } from "../convert";

export class Addr extends Opcode {
   
    // 
    // The value to be pushed on the stack.
    //
    private value!: string;

    validateOperand(): void {
        super.validateOperand();

        this.value = this.token.operands[0];
    }    

    execute(context: IExecutionContext): void {
        context.stack.push(makeBytes(addressToBytes(this.value)));
    }
}
