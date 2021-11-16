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
// Defines an application in the configuration.
//
export interface IApplicationDef {
    //
    // Global variables for the application.
    //
    globals?: ITable<ValueDef>;
}

//
// Defines an asset in the configuration.
//
export interface IAssetDef {
    //
    // Field values for the asset.
    //
    fields?: ITable<ValueDef>;
}

//
// Defines application data under an account in the configuration.
//
export interface IAccountApplicationDef {
    //
    // Set to true if this account has opted into the application.
    //
    optedIn?: boolean;

    //
    // Values for application locals for the particular account.
    //
    locals: ITable<IValueDef>;
}

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
    // Assets connected to the account.
    //
    assets?: ITable<IAssetDef>;

    //
    // Values for locals for the current application.
    //
    locals: ITable<IValueDef>;

    //
    // Applications connected to the account.
    //
    applications?: ITable<IAccountApplicationDef>;
}

//
// Specifies initial configuration for TEAL code execution.
//
export interface ITealInterpreterConfig {

    //
    // The current application accessible from TEAL code.
    //
    application?: IApplicationDef;

    //
    // Applications (by id) accessible from TEAL code.
    //
    applications?: {
        [index: string]: IApplicationDef;
    };

    //
    // Accounts that can be accessed from TEAL code.
    //
    accounts?: ITable<IAccountDef>;

    //
    // Assets that can be accessed from TEAL code.
    //
    assets?: ITable<IAssetDef>;

    //
    // Global values.
    //
    globals?: ITable<ValueDef>;
    
    //
    // The current transaction.
    //
    txn?: ITable<ValueDef>

    //
    // The current transaction group.
    //
    txns?: ITable<ValueDef>[];

    //
    // Array of arguments.
    //
    readonly args?: ValueDef[];

}
