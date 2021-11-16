import { encodeUint64 } from "algosdk";
import { IExecutionContext } from "../context";
import { Opcode } from "../opcode";

export class Itob extends Opcode {
    
    //
    // The value to be converted.
    //
    private value!: bigint;

    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        this.value = this.popInt(context);
    }
    
    execute(context: IExecutionContext): void {
        this.pushBytes(context, encodeUint64(this.value));
    }
}
