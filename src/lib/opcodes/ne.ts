import { IExecutionContext } from "../context";
import { Opcode } from "../opcode";

export class Ne extends Opcode {

    execute(context: IExecutionContext): void {
        const b = context.stack.pop()!;
        const a = context.stack.pop()!;
        if (a.type !== b.type) {
            this.pushInt(context, BigInt(1));
        }
        else if (a.type === "bigint") {
            this.pushInt(context, a.value !== b.value ? BigInt(1) : BigInt(0));
        }
        else if (a.type === "byte[]") {
            const A = a.value as Uint8Array;
            const B = b.value as Uint8Array;
            this.pushInt(context,
                A.length !== B.length || !A.every((value, index) => value === B[index]) 
                ? BigInt(1) 
                : BigInt(0)
            );
        }
        else {
            throw new Error(`Unexpected value type: ${a.type}`);
        }
    }
}