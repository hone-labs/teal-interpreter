
import { IAccountApplicationDef, IAccountDef, IApplicationDef, IAssetDef, ITable, ITealInterpreterConfig } from "./config";
import { loadValues, loadValueTable } from "./convert";
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
// Details for applications related to an account.
//
export interface IAccountApplication {
    //
    // Set to true if this account has opted into this applicaiton.
    //
    optedIn?: boolean;

    //
    // Storage for local variables related to the application.
    //
    locals: ITable<ITypedValue | ITypedValue[]>;
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
    // Assets connected to this account.
    //
    assets: ITable<IAsset>;

    //
    // Storage for local variables related to the current application.
    //
    locals: ITable<ITypedValue | ITypedValue[]>;

    //
    // Details for applications related to this account.
    //
    applications: ITable<IAccountApplication>;
}

//
// Represents an Algorand applicaton.
//
export interface IApplication {

    //
    // Values for application global variables.
    //
    globals: ITable<ITypedValue | ITypedValue[]>;
}

//
// Represents an Algorand asset.
//
export interface IAsset {
    //
    // Field values for the asset.
    //
    fields: ITable<ITypedValue>;
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
    // Applications that can be referenced from TEAL code.
    //
    applications: ITable<IApplication>;

    //
    // Accounts that can be used from TEAL code.
    //
    accounts: ITable<IAccount>;

    //
    // Assets that can be used from TEAL code.
    //
    assets: ITable<IAsset>;

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
    globals: ITable<ITypedValue | ITypedValue[]>;
    
    //
    // The current transaction.
    //
    txn: ITable<ITypedValue | ITypedValue[]>;

    //
    // The current transaction group.
    //
    txns: ITable<ITypedValue | ITypedValue[]>[];
    
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
        application: {
            globals: loadValueTable(config?.application?.globals),
        },
        applications: 
            loadTable<IApplicationDef, IApplication>(config?.applications, appDef => {
                return {
                    globals: loadValueTable(appDef.globals),
                };
            }
        ),
        assets: 
            loadTable<IAssetDef, IAsset>(config?.assets, assetDef => {
                return {
                    fields: loadValueTable(assetDef.fields),
                };
            }
        ),
        accounts: 
            loadTable<IAccountDef, IAccount>(config?.accounts, accountDef => {
                return {
                    balance: accountDef.balance || 0,
                    minBalance: accountDef.minBalance || 0,
                    assets: loadTable<IAssetDef, IAsset>(accountDef.assets, assetDef => {
                        return {
                            fields: loadValueTable(assetDef.fields),                                        
                        };
                    }),         
                    locals: loadValueTable(accountDef.locals),   
                    applications: 
                        loadTable<IAccountApplicationDef, IAccountApplication>(accountDef.applications, accAppDef => {
                            return {
                                optedIn: accAppDef.optedIn || false,
                                locals: loadValueTable(accAppDef.locals),
                            };
                        }
                    ),
                }
            }
        ),
        branchTargets: branchTargets,
        stack: [],
        args: config?.args !== undefined ? loadValues(config.args) : [],
        txn: config?.txn ? loadValueTable(config.txn) : {},
        txns: config?.txns ? config.txns.map(loadValueTable) : [],
        globals: config?.globals ? loadValueTable(config.globals) : {},
        scratch: new Array<ITypedValue>(255).fill(makeBigInt(BigInt(0))),
        intcblock: [],
        bytecblock: [],
        finished: false,
    };
    return context;
}