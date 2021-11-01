//
// Results of executing TEAL code.

import { StackEntry } from "..";

//
export interface IExecuteResult {
    
    //
    // The version of the TEAL executed.
    //
    readonly version: number;

    //
    // The compute stack remaining when execution has finished.
    //
    readonly stack: StackEntry[];
}
