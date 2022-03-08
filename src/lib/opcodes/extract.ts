import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Extract extends Opcode {

    //
    // The start of the range of bytes.
    //
    private start!: number;

    //
    // The length of the range of bytes.
    //
    private length!: number;
    
    validateOperand() {
        super.validateOperand();

        this.start = Number(this.parseIntOperand(0));
        this.length = Number(this.parseIntOperand(1));
    }
    

    execute(context: IExecutionContext): void {
        const bytes = this.popBytes(context);
        let length = this.length;
        if (length === 0) {
            length = bytes.length - this.start;
        }
        this.pushBytes(context, bytes.slice(this.start, this.start + length));
    }
}
