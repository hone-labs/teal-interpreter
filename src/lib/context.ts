
import { IBranchTargetMap } from "./parser";

//
// Represents a value in the Algorand virtual machine.
//
export type ValueType = bigint | Uint8Array;

//
// A value that is annotated with a record of its type.
//
export interface ITypedValue {
    //
    // The type of the value.
    //
    type: "bigint" | "byte[]";

    //
    // The value of the value.
    //
    value: ValueType;
}

//
// Makes a big int value that can be pushed on the stack or stored in scratch.
//
export function makeBigInt(value: bigint): ITypedValue {
    return {
        type: "bigint",
        value: value,
    };
}

//
// Makes a byte[] value that can be pushed on the stack or stored in scratch.
//
export function makeBytes(value: Uint8Array): ITypedValue {
    return {
        type: "byte[]",
        value: value,
    };
}

//
// A lookup table for values.
//
export interface IValueMap {
    [index: string]: ITypedValue | ITypedValue[];
}

//
// Represents an Algorand account.
//
export interface IAccount {
    
    //
    // The balance of the account (in microalgos).
    //
    balance?: number | bigint;

    //
    // Values for account local variables.
    //
    locals: IValueMap;
}

//
// A lookup table for accounts.
//
export interface IAccountMap {
    [index: string]: IAccount;
}

//
// Represents an Algorand applicaton.
//
export interface IApplication {

    //
    // Values for application global variables.
    //
    globals: IValueMap;
}

//
// Context for executions of TEAL opcodes.
//
export interface IExecutionContext {

    //
    // The current application that can be used from TEAL code.
    //
    application: IApplication;
    
    //
    // Accounts that can be used from TEAL code.
    //
    accounts: IAccountMap;

    //
    // Set to true to request that execution finish.
    //
    finished: boolean;

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
    scratch: ITypedValue[];

    //
    // Global values.
    //
    globals: IValueMap;
    
    //
    // The current transaction.
    //
    txn: IValueMap;

    //
    // The current transaction group.
    //
    txns: IValueMap[];
    
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
    readonly stack: ITypedValue[];

    //
    // Array of arguments.
    //
    readonly args: ITypedValue[];
}
