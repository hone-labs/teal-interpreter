
import { ITable, ITealInterpreterConfig, ValueDef } from "./config";
import { loadValues, loadValueTable, loadValueTableWithArrays } from "./convert";
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

    //
    // Specifies the originally encoded version of this value.
    // This can be a hint to the debugger on how to display the value.
    //
    from?: ValueDef;
}

//
// Makes a big int value that can be pushed on the stack or stored in scratch.
//
export function makeBigInt(value: bigint, from?: ValueDef): ITypedValue {
    return {
        type: "bigint",
        value: value,
        from: from,
    };
}

//
// Makes a byte[] value that can be pushed on the stack or stored in scratch.
//
export function makeBytes(value: Uint8Array, from?: ValueDef): ITypedValue {
    return {
        type: "byte[]",
        value: value,
        from: from,
    };
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
    // The minimum balance of the account (in microalgos).
    //
    minBalance?: number | bigint;

    //
    // Storage for local variables per application.
    //
    appLocals: ITable<ITable<ITypedValue>>;

    //
    // Set of applications (IDs) this account has opted into.
    //
    appsOptedIn: Set<string>;

    //
    // Asset holdings for this account.
    //
    assetHoldings: ITable<ITable<ITypedValue>>;
}

//
// Context for executions of TEAL opcodes.
//
export interface IExecutionContext {

    //
    // Index of the instruction to execute next.
    //
    curInstructionIndex: number;

    //
    // Application globals that can be referenced from TEAL code.
    //
    appGlobals: ITable<ITable<ITypedValue>>;

    //
    // Asset params that can be accessed from TEAL code.
    //
    assetParams: ITable<ITable<ITypedValue>>;

    //
    // App params tath can be accessed from TEAL code.
    //
    appParams: ITable<ITable<ITypedValue>>;

    //
    // Accounts that can be used from TEAL code.
    //
    accounts: ITable<IAccount>;

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
    globals: ITable<ITypedValue>;
    
    //
    // The current transaction.
    //
    txn: ITable<ITypedValue | ITypedValue[]>;

    //
    // The current transaction group.
    //
    gtxn: ITable<ITypedValue | ITypedValue[]>[];

    //
    // Scratch space corresponding to transactions in a group.
    //
    txnSideEffects: ITable<ITable<ITypedValue>>;

    //
    // Results (by transaction index) of opcodes `gaid` and `gaids`.
    //
    gaid: ITable<ITypedValue>;
    
    //
    // The version of the TEAL executed.
    //
    version: number;

    //
    // Converts a branch target to an instruction index.
    //
    branchTargets: IBranchTargetMap;

    //
    // Marks the location to return to for each nested function call.
    //
    callstack: number[];

    //
    // The compute stack used for execution.
    //
    readonly stack: ITypedValue[];

    //
    // Array of arguments.
    //
    readonly args: ITypedValue[];
}

//
// Load a lookup table from config.
//
function loadTable<FromT, ToT>(obj: ITable<FromT> | undefined, loader: (config: FromT) => ToT): ITable<ToT> {
    const loaded: ITable<ToT> = {};
    if (obj) {
        for (const key of Object.keys(obj)) {
            loaded[key] = loader(obj[key]);
        }
    }

    return loaded;
}

//
// Load an execution context from a configuration.
//
export function loadContext(branchTargets: IBranchTargetMap, config?: ITealInterpreterConfig): IExecutionContext {

    const context: IExecutionContext = {
        version: 1,
        curInstructionIndex: 0,
        appGlobals: loadTable(config?.appGlobals, loadValueTable),
        assetParams: loadTable(config?.assetParams, loadValueTable),
        appParams: loadTable(config?.appParams, loadValueTable),
        accounts: 
            loadTable(config?.accounts, accountDef => {
                return {
                    balance: accountDef.balance || 0,
                    minBalance: accountDef.minBalance || 0,
                    appLocals: loadTable(accountDef.appLocals, loadValueTable),
                    appsOptedIn: new Set<string>(accountDef.appsOptedIn.map(appId => appId.toString())),
                    assetHoldings: loadTable(accountDef.assetHoldings, loadValueTable),
                };
            }
        ),
        branchTargets: branchTargets,
        callstack: [],
        stack: [],
        args: config?.args !== undefined ? loadValues(config.args) : [],
        txn: loadValueTableWithArrays(config?.txn),
        gtxn: config?.gtxn ? config.gtxn.map(loadValueTableWithArrays) : [],
        txnSideEffects: loadTable(config?.txnSideEffects, loadValueTable),
        gaid: loadValueTable(config?.gaid),
        globals: loadValueTable(config?.globals),
        scratch: new Array<ITypedValue>(255).fill(makeBigInt(BigInt(0))),
        intcblock: [],
        bytecblock: [],
        finished: false,
    };
    return context;
}