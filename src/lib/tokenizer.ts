
import { DH_UNABLE_TO_CHECK_GENERATOR } from "constants";
import { stringToBytes } from "./convert";
import { IToken } from "./token";

//
// Tokenizes TEAL code and returns an intermediate format.
//
export interface ITokenizer {

}

//
// Tokenizes TEAL code and returns an intermediate format.
//
export class Tokenizer implements ITokenizer {

    //
    // The current offset in the TEAL code.
    //
    curOffset: number = 0;

    //
    // The current line number.
    //
    curLineNo: number = 1;

    constructor(private tealCode: string) {
    }

    //
    // Gets the next token.
    // Returns undefined when no more tokens.
    //
    nextToken(): IToken | undefined {

        while (true) {
            this.skipWhiteSpace();

            if (this.curOffset >= this.tealCode.length) {
                return undefined;
            }

            const lineNo = this.curLineNo;
            const tokenStart = this.curOffset;
            let tokenEnd: number | undefined;
            let commentStart: number | undefined;
    
            while (this.curOffset < this.tealCode.length) {
                if (this.tealCode[this.curOffset] === '#') {
                    if (!this.tealCode.includes("#pragma", this.curOffset)) {
                        // A comment ends the token.
                        // Scan to end of line or end of input.
                        tokenEnd = this.curOffset; 
                        commentStart = this.curOffset + 1;
                        this.skipToEndOfLine();
                        break;
                    }        
                }
                else if (this.tealCode[this.curOffset] === '/' && 
                    this.curOffset+1 <  this.tealCode.length && 
                    this.tealCode[this.curOffset+1] === '/') {
                    // A comment ends the token.
                    // Scan to end of line or end of input.
                    tokenEnd = this.curOffset; 
                    commentStart = this.curOffset + 2;
                    this.skipToEndOfLine();
                    break;
                }
                else if (this.tealCode[this.curOffset] === "\n") {
                    // End of line ends the instruction.
                    this.curLineNo += 1;
                    tokenEnd = this.curOffset; 
                    this.curOffset += 1;
                    break;
                }
                else if (this.tealCode[this.curOffset] === ";") {
                    // Semicolon will separate the next instruction.
                    tokenEnd = this.curOffset; 
                    this.curOffset += 1;
                    break;
                }

                this.curOffset += 1;
            }

            if (tokenEnd === undefined) {
                tokenEnd = this.curOffset;
            }

            if (tokenEnd > tokenStart) {
                // Have a token.
                // Split into opcode and operands by whitespace.
                return this.parseInstruction(tokenStart, tokenEnd, lineNo, commentStart, this.curOffset);
            }
        }
    }

    //
    // Skips white space (but not new lines which are significant).
    //
    private skipWhiteSpace(): void {
        while (this.curOffset < this.tealCode.length) {
            const ch = this.tealCode[this.curOffset];
            if (ch === " "
                || ch === "\t"
                || ch === "\r") {
                this.curOffset += 1;
            }
            else {
                break;
            }
        }
    }

    //
    // Skips to the end of the current line.
    //
    private skipToEndOfLine(): void {
        while (this.curOffset < this.tealCode.length) {
            if (this.tealCode[this.curOffset++] === "\n") {
                this.curLineNo += 1;
                return;
            }
        }
    }

    //
    // Parse an instruction and returns the tokenized representation of it.
    //
    private parseInstruction(tokenStart: number, tokenEnd: number, lineNo: number, commentStart?: number, commentEnd?: number): IToken {
        const parts = this.tealCode.substring(tokenStart, tokenEnd)
            .trim()
            .split(" ")
            .filter(part => part.length > 0);
        let comment: string | undefined;
        if (commentStart !== undefined && commentEnd !== undefined) {
            comment = this.tealCode.substring(commentStart, commentEnd).trim();
        }
        const opcode = parts.shift()!;
        const token: IToken = {
            lineNo: lineNo,
            opcode: opcode,
            operands: parts,
            comment: comment,
        };         
        return token;
    }

}

//
// Tokenizes TEAL code and returns an intermediate format.
//
export function tokenize(tealCode: string): IToken[] {
    const tokenizer = new Tokenizer(tealCode);
    const tokens: IToken[] = [];
    while (true) {
        const token = tokenizer.nextToken();
        if (token) {
            tokens.push(token);
        }
        else {
            break;
        }
    }
    return tokens;
}
