import { IExecuteResult } from ".";

//
// Represents validation and execution for an opcode.
//
export interface IOpcode {

    //
    // Validates the operands for the opcode.
    //
    validateOperand(): void;

    //
    // Validate the opcode against the current context.
    //    
    validateContext(context: IExecuteResult): void;

    //
    // Executes the opcode.
    //
    execute(context: IExecuteResult): void;
}
