import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Branch extends Opcode {
    
    //
    // The name of the target to branch to.
    //
    private targetName!: string;
    
    validateOperand() {
        super.validateOperand();

        this.targetName = this.token.operands[0];
    }

    validateContext(context: IExecutionContext) {
        const branchTarget = context.branchTargets[this.targetName];
        if (branchTarget === undefined) {
            throw new Error(`Failed to find branch target ${this.targetName}.`);
        }
    }
    
    execute(context: IExecutionContext): number {
        return context.branchTargets[this.targetName].targetInstructionIndex;
    }
}
