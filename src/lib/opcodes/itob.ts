import { encodeUint64 } from "algosdk";
import { IExecutionContext, makeBytes } from "../context";
import { Opcode } from "../opcode";
import { IToken } from "../token";

export class Itob extends Opcode {
    
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
        context.stack.push(makeBytes(encodeUint64(this.value)));
    }
}
