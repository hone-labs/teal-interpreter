import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "algosdk";

export class Addr extends Opcode {
   
    // 
    // The value to be pushed on the stack.
    //
    private value!: string;

    constructor(token: IToken) {
        super(token, 1, 0);
    }
    
    validateOperand(): void {
        super.validateOperand();

        this.value = this.token.operands[0];
    }    

    execute(context: IExecutionContext): void {
        context.stack.push(decodeAddress(this.value).publicKey);
    }
}
