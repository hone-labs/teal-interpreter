import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export abstract class Binary extends Opcode {

    //
    // Arguments for the binary operator popped form the compute stack.
    //
    protected a!: bigint;
    protected b!: bigint;

    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        this.b = this.popInt(context);
        this.a = this.popInt(context);
    }
   
}
