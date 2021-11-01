import { IOpcode } from "./opcode";
import { opcodeDefs } from "./opcodes";
import { tokenize } from "./tokenize";

//
// Results of parsing TEAL code.
//
export interface IParseResult {
    //
    // Parsed instructions.
    //
    readonly operations: IOpcode[];
}

//
// Parses TEAL code and returns an intermediate format.
//
export function parse(tealCode: string): IParseResult {

    const tokens = tokenize(tealCode);
    const operations = tokens.map(token => {
        return opcodeDefs[token.opcode].factory(token);
    });

    // 
    // Validate each operation.
    //
    for (const opcode of operations) {
        opcode.validateOperand();
    }
        
    return {
        operations: operations,
    };
}
