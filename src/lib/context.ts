
//
// An entry in the AVM compute stack.
//
export type StackEntry = bigint | Uint8Array;

//
// Context for executions of TEAL opcodes.
//
export interface IExecutionContext {
    
    //
    // The version of the TEAL executed.
    //
    version: number;

    //
    // The compute stack used for execution.
    //
    readonly stack: StackEntry[];
}
