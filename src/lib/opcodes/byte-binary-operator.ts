import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export abstract class ByteBinary extends Opcode {

    //
    // Arguments for the binary operator popped from the compute stack.
    //
    protected bytesA!: Uint8Array;
    protected bytesB!: Uint8Array;
    protected intA!: bigint;
    protected intB!: bigint;

    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        this.bytesB = this.popBytes(context);
        this.intB = this.bytesToInt(this.bytesB);

        this.bytesA = this.popBytes(context);
        this.intA = this.bytesToInt(this.bytesA);
    }
   
}
