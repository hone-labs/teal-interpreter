import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
const { Keccak } = require("sha3");

export class Keccak256 extends Opcode {
    
    execute(context: IExecutionContext): void {
        const value = this.popBytes(context);
        const hash = new Keccak(256);
        hash.update(Buffer.from(value).toString('utf-8'));
        this.pushBytes(context, Uint8Array.from(hash.digest()));
    }
}
