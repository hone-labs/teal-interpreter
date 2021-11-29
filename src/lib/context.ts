
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
    // The current inner transaction.
    //
    itxn?: ITable<ITypedValue | ITypedValue[]>;

    //
    // The previously submitted inner transaciotn.
    //
    lastItxn?: ITable<ITypedValue | ITypedValue[]>;

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

    //
    // Request an account from the configuration returning undefined if the account is not found.
    //
    requestAccount(accountName: string): Promise<IAccount | undefined>;

    //
    // Event raised when an account is not found, allowing the account to be generated on demand.
    //
    onAccountNotFound?: (accoutName: string) => Promise<void>;

    //
    // Require an account and throw if it doesn't exist.
    //
    requireAccount(accoutnName: string, forOpcode: string): Promise<IAccount>;

    //
    // Converts the context back to a configuration.
    //
    toConfiguration(): ITealInterpreterConfig;
}

export class ExecutionContext implements IExecutionContext {

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
    // The current inner transaction.
    //
    itxn?: ITable<ITypedValue | ITypedValue[]>;

    //
    // The previously submitted inner transaciotn.
    //
    lastItxn?: ITable<ITypedValue | ITypedValue[]>;

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

    constructor(branchTargets: IBranchTargetMap, config?: ITealInterpreterConfig) {
        this.version = 1;
        this.curInstructionIndex = 0;
        this.appGlobals = loadTable(config?.appGlobals, loadValueTable);
        this.assetParams = loadTable(config?.assetParams, loadValueTable);
        this.appParams = loadTable(config?.appParams, loadValueTable);
        this.accounts = loadTable(config?.accounts, accountDef => {
            return {
                balance: accountDef.balance || 0,
                minBalance: accountDef.minBalance || 0,
                appLocals: loadTable(accountDef.appLocals, loadValueTable),
                appsOptedIn: new Set<string>(accountDef.appsOptedIn ? accountDef.appsOptedIn.map(appId => appId.toString()) : []),
                assetHoldings: loadTable(accountDef.assetHoldings, loadValueTable),
            };
        });
        this.branchTargets = branchTargets;
        this.callstack = [];
        this.stack = [];
        this.args = config?.args !== undefined ? loadValues(config.args) : [];
        this.txn = loadValueTableWithArrays(config?.txn);
        this.gtxn = config?.gtxn ? config.gtxn.map(loadValueTableWithArrays) : [];
        this.txnSideEffects = loadTable(config?.txnSideEffects, loadValueTable);
        this.gaid = loadValueTable(config?.gaid);
        this.globals = loadValueTable(config?.globals);
        this.scratch = new Array<ITypedValue>(255).fill(makeBigInt(BigInt(0)));
        this.intcblock = [];
        this.bytecblock = [];
        this.finished = false;
    }

    //
    // Request an account from the configuration returning undefined if the account is not found.
    //
    async requestAccount(accountName: string): Promise<IAccount | undefined> {
        let account = this.accounts[accountName];
        if (!account) {
            if (this.onAccountNotFound) {
                // Allows the requested account to be automatically generated.
                await this.onAccountNotFound(accountName);

                // Try and get the account again.
                account = this.accounts[accountName];
            }
        }

        return account;
    }

    //
    // Event raised when an account is not found, allowing the account to be generated on demand.
    //
    onAccountNotFound?: (accoutName: string) => Promise<void>;

    //
    // Require an account and throw if it doesn't exist.
    //
    async requireAccount(accountName: string, forOpcode: string): Promise<IAccount> {
        const account = await this.requestAccount(accountName);
        if (!account) {
            throw new Error(`Account "${accountName}" not found, required by opcode "${forOpcode}", please add this account to your configuration.`);
        }

        return account;
    }

    //
    // Converts the context back to a configuration.
    //
    toConfiguration(): ITealInterpreterConfig {
        return {
            //todo:
        };
    }
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

