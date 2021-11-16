import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class SetBit extends Opcode {

    execute(context: IExecutionContext): void {
        const c = Number(this.popInt(context));
        const b = Number(this.popInt(context));
        const a = context.stack.pop()!;
        if (a.type === "bigint") {
            const bitArray = Array.from(a.value.toString(2).padStart(64, "0"));
            bitArray[bitArray.length - b - 1] = (c === 0 ? "0" : "1");
            this.pushInt(context, BigInt(parseBinary(bitArray)));
        }
        else if (a.type === "byte[]") {
            const byteIndex = Math.floor(b / 8);
            const bitIndex = b % 8;
            if (c === 1) { // Set bit.
                (a.value as Uint8Array)[byteIndex] |= 1 << (7 - bitIndex);
            } 
            else { // Clear bit.
                (a.value as Uint8Array)[byteIndex] &= ~(1 << ((7 - bitIndex)));
            }
            context.stack.push(a);
        }
        else {
            throw new Error(`Unexpected type ${a.type} found on stack.`);
        }
    }
}

//
// Parse a binary representation to a number.
//
function parseBinary(binary: string[]): number {

    let result = 0;

    for (let i = 0; i < binary.length; ++i) {
        if (binary[i] === "1") {
            result += (2 ** (binary.length - 1 - i));
        }
    }
    return result;
}
  