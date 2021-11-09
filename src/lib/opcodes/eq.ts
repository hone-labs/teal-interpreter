import { IExecutionContext, makeBigInt } from "../context";
import { Opcode } from "../opcode";
import { IToken } from "../token";

export class Eq extends Opcode {

    constructor(token: IToken) {
        super(token, 0, 2);
    }
    
    execute(context: IExecutionContext): void {
        const b = context.stack.pop()!;
        const a = context.stack.pop()!;
        if (a.type !== b.type) {
            context.stack.push(makeBigInt(BigInt(0)));
        }
        else if (a.type === "bigint") {
            context.stack.push(makeBigInt(a.value === b.value ? BigInt(1) : BigInt(0)));    
        }
        else if (a.type === "byte[]") {
            const A = a.value as Uint8Array;
            const B = b.value as Uint8Array;
            context.stack.push(makeBigInt(
                A.length === B.length && A.every((value, index) => value === B[index]) 
                ? BigInt(1) 
                : BigInt(0)
            ));
        }
        else {
            throw new Error(`Unexpected value type: ${a.type}`);
        }
    }
}