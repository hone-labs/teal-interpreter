import { IExecuteResult } from "../..";
import { IToken } from "../../token";
import { IOpcode } from "../../opcode";


export class Int implements IOpcode {
    
    //
    // The instruction that contains the opcode.
    //
    private instruction: IToken;

    //
    // The integer literal value parsed from operands.
    //
    private value?: number;

    constructor(instruction: IToken) {
        this.instruction = instruction;
    }
    
    validateOperand(): void {
        if (this.instruction.operands.length !== 1) {
            throw new Error(`Opcode + expects 1 operands.`);
        }

        const operand = this.instruction.operands[0];

        try {
            this.value = parseInt(operand);
        }
        catch {
            throw new Error(`Failed to parse integer operand to instruction "int" from operand ${operand}`);
        }
    }
    
    validateContext(context: IExecuteResult): void {
        // Nothing required.
    }
    
    execute(context: IExecuteResult): void {
        context.stack.push(BigInt(this.value!));        
    }
}
