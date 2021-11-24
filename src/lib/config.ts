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
// Unencoded value for an argument.
//
export interface IValueDef {

    //
    // The type of the value.
    //
    readonly type: "array" | "int" | "string" | "addr";

    //
    // The value of the value.
    //
    readonly value: any;
}

//
// Extended value definition.
//
export type ValueDef = bigint | number | string | IValueDef;

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
    appLocals: ITable<ITable<IValueDef>>;

    //
    // List of applications (IDs) this account has opted into.
    //
    appsOptedIn: (number | string)[];

    //
    // Asset holdings for this account.
    //
    assetHoldings: ITable<ITable<IValueDef>>;
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
    txn?: ITable<ValueDef | ValueDef[]>;

    //
    // The current transaction group.
    //
    gtxn?: ITable<ValueDef | ValueDef[]>[];

    //
    // Array of arguments.
    //
    readonly args?: ValueDef[];

}
