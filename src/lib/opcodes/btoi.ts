import { decodeUint64 } from "algosdk";
import { IExecutionContext } from "../context";
import { Opcode } from "../opcode";
import { IToken } from "../token";

export class Btoi extends Opcode {
    
    //
    // The value to be converted.
    //
    private value!: bigint;

    constructor(token: IToken) {
        super(token, 0, 1);
    }

    validateContext(context: IExecutionContext) {
        super.validateOperand();

        this.value = this.popInt(context);
    }
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop() as Uint8Array;
        context.stack.push(decodeUint64(value, "bigint"));
    }
}
