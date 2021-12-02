
import { autoCreateField } from "./auto-field";
import { ITable, ITealInterpreterConfig, ValueDef } from "./config";
import { loadNestedTable, loadTable, loadValue, serializeValue } from "./convert";
import { IBranchTargetMap } from "./parser";

//
// A default values for context fields.
//
const defaultValueSpec = {
    accounts: {
        new: () => ({}),
        "*": {
            appLocals: {
                "*": {
                    "*": 0,
                }
            },
        },
    },
    globals: {
        "*": 0,
    },
    txn: {
        "*": 0,
    },
};

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
// Returns true if the input value is determined to be a "typed value" object.
//
export function isTypedValue(value: any): boolean {
    return typeof(value) === "object"
        && "type" in value 
        && "value" in value;
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
    appsOptedIn: string[];

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
    txn: ITable<ITypedValue | ITable<ITypedValue>>;

    //
    // The current transaction group.
    //
    gtxn: ITable<ITable<ITypedValue | ITable<ITypedValue>>>;

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
    stack: ITypedValue[];

    //
    // Array of arguments.
    //
    args: ITable<ITypedValue>;

    //
    // Event raised when a configuration field is not found, allowing the configuration to be generated on demand.
    //
    onConfigNotFound?: (fieldPath: string) => Promise<void>;

    //
    // Requests a value from the configuration.
    // Returns undefined when the specified field is not found in the configuration.
    //
    requestValue<T = ITypedValue>(fieldPath: string): Promise<T | undefined>;

    //
    // Requires a value from the configuration. Throws when the request field is not found.
    //
    requireValue<T = ITypedValue>(fieldPath: string, forOpcode: string): Promise<T>;

    //
    // Requires an array of values from the configuration. Throws when the request field is not found.
    //
    requireValueArray<T = ITypedValue>(fieldPath: string, forOpcode: string): Promise<T[]>;

    //
    // Automatically creates a missing field in the context.
    //
    autoCreateField(fieldPath: string): void;

    //
    // Converts the context back to a configuration.
    //
    serialize(): ITealInterpreterConfig;
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
    txn: ITable<ITypedValue | ITable<ITypedValue>>;

    //
    // The current transaction group.
    //
    gtxn: ITable<ITable<ITypedValue | ITable<ITypedValue>>>;

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
    stack: ITypedValue[];

    //
    // Array of arguments.
    //
    args: ITable<ITypedValue>;

    constructor(branchTargets: IBranchTargetMap, config?: ITealInterpreterConfig) {
        this.version = 1;
        this.curInstructionIndex = 0;
        this.appGlobals = loadTable(config?.appGlobals, appGlobals => loadTable(appGlobals, loadValue));
        this.assetParams = loadTable(config?.assetParams, assetParams => loadTable(assetParams, loadValue));
        this.appParams = loadTable(config?.appParams, appParams => loadTable(appParams, loadValue));
        this.accounts = loadTable(config?.accounts, accountDef => {
            return {
                balance: accountDef.balance || 0,
                minBalance: accountDef.minBalance || 0,
                appLocals: loadTable(accountDef.appLocals, appLocals => loadTable(appLocals, loadValue)),
                appsOptedIn: accountDef.appsOptedIn || [],
                assetHoldings: loadTable(accountDef.assetHoldings, assetHoldings => loadTable(assetHoldings, loadValue)),
            };
        });
        this.branchTargets = branchTargets;
        this.callstack = [];
        this.stack = [];
        this.args = loadTable(config?.args, loadValue);
        this.txn = loadNestedTable(config?.txn, loadValue);
        this.gtxn = loadTable(config?.gtxn, txn => loadNestedTable(txn, loadValue));
        this.txnSideEffects = loadTable(config?.txnSideEffects, txn => loadTable(txn, loadValue));
        this.gaid = loadTable(config?.gaid, loadValue);
        this.globals = loadTable(config?.globals, loadValue);
        this.scratch = new Array<ITypedValue>(255).fill(makeBigInt(BigInt(0)));
        this.intcblock = [];
        this.bytecblock = [];
        this.finished = false;
    }

    //
    // Event raised when a configuration field is not found, allowing the configuration to be generated on demand.
    //
    onConfigNotFound?: (fieldPath: string) => Promise<void>;

    //
    // Finds value in the configuration at a specified path.
    //
    private findValue<T>(fieldPath: string): T | undefined {
        let working = this as any;
        const parts = fieldPath.split(".");

        for (const part of parts) {
            working = working[part];

            if (working == undefined) {
                // Value not found!
                return undefined;
            }
        }

        return working as T;
    }


    //
    // Requests a value from the configuration.
    // Returns undefined when the specified field is not found in the configuration.
    //
    async requestValue<T>(fieldPath: string): Promise<T | undefined> {

        const value = this.findValue<T>(fieldPath);
        if (value !== undefined) {
            // Got it!
            return value;
        }

        //
        // Value not found!
        //
        if (this.onConfigNotFound) {
            // Allows the requested value to be automatically generated.
            await this.onConfigNotFound(fieldPath);
            
            // Then try again.
            const value = this.findValue<T>(fieldPath);
            if (value !== undefined) {
                // Got it!
                return value;
            }
        }

        return undefined;
    }

    //
    // Requires a value from the configuration. Throws when the request field is not found.
    //
    async requireValue<T>(fieldPath: string, forOpcode: string): Promise<T> {
        const value = await this.requestValue<T>(fieldPath);
        if (value === undefined) {
            throw new Error(`Configuration field "${fieldPath}" not found in your configuration. Required by ${forOpcode}.`)   
        }

        if (Array.isArray(value)) {
            throw new Error(`Expected configuration field "${fieldPath}" to NOT be an array when used with opcode ${forOpcode}.`);
        }

        return value;
    }

    //
    // Requires an array of values from the configuration. Throws when the request field is not found.
    //
    async requireValueArray<T>(fieldPath: string, forOpcode: string): Promise<T[]> {
        const value = await this.requestValue<T[]>(fieldPath);
        if (value === undefined) {
            throw new Error(`Configuration field "${fieldPath}" not found in your configuration. Required by ${forOpcode}.`)   
        }

        if (!Array.isArray(value)) {
            throw new Error(`Expected configuration field "${fieldPath}" to be an array when used with opcode ${forOpcode}.`);
        }

        return value;
    }

  
    //
    // Automatically creates a missing field in the context.
    //
    autoCreateField(fieldPath: string): void {
        return autoCreateField(this, fieldPath, defaultValueSpec);
    }

    //
    // Serialize a value.
    //
    private serializeValue(value: any): any {
        if (Array.isArray(value)) {
            const outputArray: any[] = [];

            for (const element of value) {
                outputArray.push(this.serializeValue(element));
            }

            return outputArray;
        }
        else {
            if (typeof(value) === "object") {
                if (isTypedValue(value)) {
                    return serializeValue(value as ITypedValue);
                }
                else {
                    const output: any = {};
                    this.internalSerialize(value, output);
                    return output;
                }
            }
            else {
                return value;
            }
        }
    }

    //
    // Internal (recursive) serialization function.
    //
    private internalSerialize(input: any, output: any): void {
        for (const [key, value] of Object.entries<any>(input)) {
            output[key] = this.serializeValue(value);
        }
    }

    //
    // Converts the context back to a configuration.
    //
    serialize(): ITealInterpreterConfig {
        const output: any = {};
        this.internalSerialize(this, output);
        return output;
    }
}

