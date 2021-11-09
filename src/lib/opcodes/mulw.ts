import { IExecutionContext, makeBigInt } from "../context";
import { Binary } from "./binary-operator";

export const MAX_UINT64 = BigInt(0xFFFFFFFFFFFFFFFF);

export class Mulw extends Binary {
    
    execute(context: IExecutionContext): void {
        const result = this.a * this.b;
        const low = result & MAX_UINT64;
        const high = result >> BigInt(64);
        context.stack.push(makeBigInt(high));
        context.stack.push(makeBigInt(low));    
    }
}
