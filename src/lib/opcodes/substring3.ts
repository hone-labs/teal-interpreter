import { Opcode } from "../opcode";
import { IExecutionContext, makeBytes } from "../context";

export class Substring3 extends Opcode {

    //
    // Value to extract the substring from.
    //
    private value!: Uint8Array;

    //
    // Starting position to extract the substring.
    //
    private position!: bigint;

    //
    // Ending position to extract the substring.
    //
    private end!: bigint;

    validateContext(context: IExecutionContext) {
        super.validateContext(context);

        this.end = this.popInt(context);
        this.position = this.popInt(context);
        this.value = context.stack.pop()!.value as Uint8Array;
    }

    execute(context: IExecutionContext): void {
        context.stack.push(makeBytes(this.value.subarray(Number(this.position), Number(this.end))));
    }
}
