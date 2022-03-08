import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { IToken } from "../token";
import { IOpcodeDef } from "../opcodes";

export class ExtractUint_X extends Opcode {

    constructor(token: IToken, opcodeDef: IOpcodeDef, protected numBytes: number) {
        super(token, opcodeDef)
    }

    execute(context: IExecutionContext): void {
        const b = Number(this.popInt(context));
        const a = this.popBytes(context);
        this.pushInt(context, this.bytesToInt(a.slice(b, b + this.numBytes)));
    }
}
