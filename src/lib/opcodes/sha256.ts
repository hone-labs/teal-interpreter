import { Opcode } from "../opcode";
import { IExecutionContext, makeBytes } from "../context";
import { sha256 } from "js-sha256";

export class Sha256 extends Opcode {
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop()?.value as Uint8Array;
        const hash = sha256.create();
        hash.update(value);
        context.stack.push(makeBytes(Uint8Array.from(Buffer.from(hash.hex(), 'hex'))));
    }
}
