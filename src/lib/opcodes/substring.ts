import { Opcode } from "../opcode";
import { IExecutionContext, makeBytes } from "../context";

export class Substring extends Opcode {

    //
    // Starting position to extract the substring.
    //
    private position!: number;

    //
    // Ending position to extract the substring.
    //
    private end!: number;

    validateOperand() {
        super.validateOperand();

        this.position = this.parseIntOperand(0);
        this.end = this.parseIntOperand(1);
    }

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!.value as Uint8Array;
        context.stack.push(makeBytes(value.subarray(this.position, this.end)));
    }
}
