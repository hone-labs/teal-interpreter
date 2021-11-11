import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Bnz extends Opcode {
    
    //
    // The name of the target to branch to.
    //
    private targetName!: string;

    //
    // The value to branch on.
    //
    private condition!: bigint;
    
    validateOperand() {
        super.validateOperand();

        this.targetName = this.token.operands[0];
    }

    validateContext(context: IExecutionContext) {
        const branchTarget = context.branchTargets[this.targetName];
        if (branchTarget === undefined) {
            throw new Error(`Failed to find branch target ${this.targetName}.`);
        }

        this.condition = this.popInt(context);
    }
    
    execute(context: IExecutionContext): number | void {
        if (this.condition !== BigInt(0)) {
            // Branch if not zero.
            return context.branchTargets[this.targetName];
        }
    }
}
