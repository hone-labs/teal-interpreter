export interface IInstruction {

}

//
// Results of parsing TEAL code.
//
export interface IParseResult {
    //
    // Parsed instructions.
    //
    readonly instructions: IInstruction[];
}

//
// Parses TEAL code and returns an intermediate format.
//
export function parse(tealCode: string): IParseResult {
    return {
        instructions: tealCode.split(" ")
            .filter(part => part.length > 0),
    };
}

//
// An entry in the AVM compute stack.
//
export type StackEntry = bigint | Uint8Array;

//
// Results of executing TEAL code.
//
export interface IExecuteResult {
    //
    // The compute stack remaining when execution has finished.
    //
    readonly stack: StackEntry[];
}

//
// Executes TEAL code and returns a result.
//
export function execute(tealCode: string): IExecuteResult {
    return {
        stack: [],
    };
}