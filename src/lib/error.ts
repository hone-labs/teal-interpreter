import { IToken } from "./token";

//
// Represents an error that can be thrown by the interpreter.
//
export class InterpreterError extends Error {

    //
    // The instruction that caused the error, if any.
    //
    public readonly instruction: IToken | undefined;

    constructor(msg: string, instruction?: IToken) {
        super(msg);
        
        this.instruction = instruction;
    }
}