import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Bytecblock extends Opcode {

    //
    // The byte constant block.
    //
    private bytecblock: Uint8Array[] = [];
   
    validateOperand(): void {
        super.validateOperand();

        for (const operand of this.token.operands) {
            this.bytecblock.push(new Uint8Array(Buffer.from(operand)));
        }
    }

    execute(context: IExecutionContext): void {
        context.bytecblock = this.bytecblock;
    }
}
