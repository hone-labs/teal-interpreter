
import { IBranchTargetMap } from "./parser";

//
// Represents a value in the Algorand virtual machine.
//
export type ValueType = bigint | Uint8Array;

//
// Context for executions of TEAL opcodes.
//
export interface IExecutionContext {

    //
    // Int constants block.
    //
    intcblock: bigint[];

    //
    // Byte constants block.
    //
    bytecblock: Uint8Array[];
    
    //
    // Scratch space.
    //
    scratch: ValueType[];

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
    readonly stack: ValueType[];

    //
    // Array of arguments.
    //
    readonly args: Uint8Array[];
}
