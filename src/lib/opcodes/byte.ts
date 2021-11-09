import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { Encoding, stringToBytes } from "../convert";
import { runInThisContext } from "vm";

export class Byte extends Opcode {
   
    //
    // The type of encoding.
    //
    private encoding!: string;

    // 
    // The value to be pushed on the stack.
    //
    private value!: string;

    constructor(token: IToken) {
        super(token, [1, 2], 0);
    }
    
    validateOperand(): void {
        super.validateOperand();

        if (this.token.operands.length === 1) {
            this.encoding = "base64";
            this.value = this.token.operands[0];
            if (this.value.length > 1 && this.value.startsWith('"') && this.value.endsWith('"')) {
                // Value is a string literal.
                this.encoding = "utf8";
                this.value = this.value.slice(1, this.value.length - 2);
            }
            else if (this.value.startsWith("0x")) {
                // Value is hexadecimal.
                this.encoding = "hex";
                this.value = this.value.slice(2);
            }
            else {
                // Encoding might be specified in the value.
                const [encoding, value] = this.extractEncodingAndValue(this.value);
                this.encoding = encoding;
                this.value = value;
            }
        }
        else {
            // Encoding is explicit.
            this.encoding = this.token.operands[0];
            this.value = this.token.operands[1];
        }
    }    

    //
    // Look at the value and extract the encoding and value.
    //
    private extractEncodingAndValue(value: string): [string, string] {
        const prefixes = ["base64", "b64", "base32", "b32"];
        for (const prefix of prefixes) {
            if (value.startsWith(`${prefix}(`) && value.endsWith(")")) {
                return [
                    prefix, 
                    value.slice(prefix.length+1, value.length-1)
                ];
            }
        }

        return [
            "base64",
            value
        ];
    }

    execute(context: IExecutionContext): void {
        const bytes = stringToBytes(this.value, this.encoding as Encoding);
        context.stack.push(new Uint8Array(bytes));
    }
}
