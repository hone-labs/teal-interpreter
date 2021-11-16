import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class GetBit extends Opcode {

    execute(context: IExecutionContext): void {
        const b = Number(this.popInt(context));
        const a = context.stack.pop()!;
        if (a.type === "bigint") {
            const binary = a.value.toString(2);
            this.pushInt(context, BigInt(binary[binary.length - b - 1]));
        }
        else if (a.type === "byte[]") {
            const byteIndex = Math.floor(b / 8);
            const bitIndex = b % 8;
            const binary = Array.from(a.value as Uint8Array)[byteIndex].toString(2);
            this.pushInt(context, BigInt(binary.padStart(8, "0")[bitIndex]));            
        }
        else {
            throw new Error(`Unexpected type ${a.type} found on stack.`);
        }
    }
}
