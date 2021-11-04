import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export abstract class Binary extends Opcode {

    //
    // Arguments for the binary operator popped form the compute stack.
    //
    protected a!: bigint;
    protected b!: bigint;

    constructor(token: IToken) {
        super(token, 0, 2);
    }

    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        this.b = this.popInt(context);
        this.a = this.popInt(context);
    }
    
}
