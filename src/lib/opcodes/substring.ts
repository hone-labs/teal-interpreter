import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

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

        this.position = Number(this.parseIntOperand(0));
        this.end = Number(this.parseIntOperand(1));
    }

    execute(context: IExecutionContext): void {
        const value = this.popBytes(context);
        this.pushBytes(context, value.subarray(this.position, this.end));
    }
}
