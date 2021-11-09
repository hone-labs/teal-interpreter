import { decodeUint64 } from "algosdk";
import { IExecutionContext, makeBigInt } from "../context";
import { Opcode } from "../opcode";
import { IToken } from "../token";

export class Btoi extends Opcode {
    
    constructor(token: IToken) {
        super(token, 0, 1);
    }

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()?.value as Uint8Array;
        if (value.length === 0) {
            context.stack.push(makeBigInt(BigInt(0)));    
        }
        else {
            context.stack.push(makeBigInt(decodeUint64(value, "bigint")));
        }
    }
}
