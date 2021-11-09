import { ITypedValue } from "./context";

//
// Results of executing TEAL code.
//
export interface IExecuteResult {
    
    //
    // The version of the TEAL executed.
    //
    readonly version: number;

    //
    // The compute stack remaining when execution has finished.
    //
    readonly stack: ITypedValue[];
}
