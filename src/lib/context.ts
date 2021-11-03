
import { IBranchTargetMap } from "./parser";

//
// An entry in the AVM compute stack.
//
export type StackEntry = bigint | Uint8Array;

//
// Context for executions of TEAL opcodes.
//
export interface IExecutionContext {
    
    //
    // Scratch space.
    //
    scratch: StackEntry[];

    //
    // Global values.
    //
    globals: any;
    
    //
    // The current transaction.
    //
    txn: any;

    //
    // The current transaction group.
    //
    txns: any[];
    
    //
    // The version of the TEAL executed.
    //
    version: number;

    //
    // Converts a branch target to an instruction index.
    //
    branchTargets: IBranchTargetMap;

    //
    // The compute stack used for execution.
    //
    readonly stack: StackEntry[];

    //
    // Array of arguments.
    //
    readonly args: Uint8Array[];
}
