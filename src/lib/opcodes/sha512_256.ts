import { Opcode } from "../opcode";
import { IExecutionContext, makeBytes } from "../context";
import { sha512_256 } from "js-sha512";

export class Sha512_256 extends Opcode {
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop()?.value as Uint8Array;
        const hash = sha512_256.create();
        hash.update(value);
        context.stack.push(makeBytes(Uint8Array.from(Buffer.from(hash.hex(), 'hex'))));
    }
}
