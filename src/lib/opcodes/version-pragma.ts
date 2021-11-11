import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class VersionPragma extends Opcode {
   
    //
    // The verision number parsed from operands.
    //
    private versionNo?: number;

    validateOperand(): void {
        super.validateOperand();

        const operand = this.token.operands[1];

        try {
            this.versionNo = parseInt(operand);
        }
        catch {
            throw new Error(`Failed to parse version number from "#pragma version"`);
        }
    }
    
    execute(context: IExecutionContext): void {
        context.version = this.versionNo!;
    }
}
