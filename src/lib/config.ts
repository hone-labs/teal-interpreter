//
// Configuration for the interpreter.
//

//
// Defines a lookup table of some type T.
//
export interface ITable<T> {
    [index: string]: T;
}

//
// Extended value definition.
//
export type ValueDef = bigint | number | string | number[];

//
// Defines an account in the configuration.
//
export interface IAccountDef {
    //
    // Balance of the account.
    //
    balance?: number | bigint;

    //
    // The minimum balance of the account (in microalgos).
    //
    minBalance?: number | bigint;

    //
    // A table of locals by application.
    //
    appLocals?: ITable<ITable<ValueDef>>;

    //
    // List of applications (IDs) this account has opted into.
    //
    appsOptedIn?: string[];

    //
    // Asset holdings for this account.
    //
    assetHoldings?: ITable<ITable<ValueDef>>;
}

//
// Specifies initial configuration for TEAL code execution.
//
export interface ITealInterpreterConfig {

    //
    // Application globals that can be referenced from TEAL code.
    //
    appGlobals?: ITable<ITable<ValueDef>>;

    //
    // Asset params that can be accessed from TEAL code.
    //
    assetParams?: ITable<ITable<ValueDef>>;

    //
    // App params that can be accessed from TEAL code.
    //
    appParams?: ITable<ITable<ValueDef>>;

    //
    // Accounts that can be accessed from TEAL code.
    //
    accounts?: ITable<IAccountDef>;

    //
    // Global values.
    //
    globals?: ITable<ValueDef>;
    
    //
    // The current transaction.
    //
    txn?: ITable<ValueDef | ITable<ValueDef>>;

    //
    // The current transaction group.
    //
    gtxn?: ITable<ITable<ValueDef | ITable<ValueDef>>>;

    //
    // Scratch space corresponding to transactions in a group.
    //
    txnSideEffects?: ITable<ITable<ValueDef>>;

    //
    // Results for `gaid` and `gaids` opcodes.
    //
    gaid?: ITable<ValueDef>;

    //
    // Array of arguments.
    //
    args?: ITable<ValueDef>;

    //
    // Set to true to show code coverage details.
    //
    showCodeCoverage?: boolean;

}
