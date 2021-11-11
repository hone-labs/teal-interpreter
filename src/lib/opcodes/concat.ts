import { Opcode } from "../opcode";
import { IExecutionContext, makeBytes } from "../context";

export class Concat extends Opcode {

    execute(context: IExecutionContext): void {
        const b = context.stack.pop()!.value as Uint8Array;
        const a = context.stack.pop()!.value as Uint8Array;
        const result = new Uint8Array(a.length + b.length);
        result.set(a);
        result.set(b, a.length);
        context.stack.push(makeBytes(result));
    }
}
