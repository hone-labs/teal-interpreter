import { encodeUint64 } from "algosdk";
import { IExecutionContext, makeBytes } from "../context";
import { Opcode } from "../opcode";

export class Itob extends Opcode {
    
    //
    // The value to be converted.
    //
    private value!: bigint;

    validateContext(context: IExecutionContext) {
        super.validateOperand();

        this.value = this.popInt(context);
    }
    
    execute(context: IExecutionContext): void {
        context.stack.push(makeBytes(encodeUint64(this.value)));
    }
}
