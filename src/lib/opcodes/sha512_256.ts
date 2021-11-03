import { IToken } from "../token";
import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { sha512_256 } from "js-sha512";

export class Sha512_256 extends Opcode {
    
    constructor(token: IToken) {
        super(token, 0, 1);
    }
    
    execute(context: IExecutionContext): void {
        const value = context.stack.pop() as Uint8Array;
        const hash = sha512_256.create();
        hash.update(value);
        context.stack.push(Uint8Array.from(Buffer.from(hash.hex(), 'hex')));
    }
}