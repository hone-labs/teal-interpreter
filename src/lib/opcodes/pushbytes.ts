import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { Encoding, stringToBytes } from "../convert";

export class PushBytes extends Opcode {
   
    //
    // The type of encoding.
    //
    private encoding!: string;

    // 
    // The value to be pushed on the stack.
    //
    private value!: string;

    validateOperand(): void {
        super.validateOperand();

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
            throw new Error(`Operand "${this.token.operands[0]}" for opcode "${this.token.operands}" is not a valid format.`);
        }
    }    

    execute(context: IExecutionContext): void {
        const bytes = stringToBytes(this.value, this.encoding as Encoding);
        this.pushBytes(context, new Uint8Array(bytes));
    }
}
