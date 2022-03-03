import { IExecutionContext } from "../context";
import { Opcode } from "../opcode";

export class Divmodw extends Opcode {
    
    execute(context: IExecutionContext): void {

        const d = this.popInt(context);
        const c = this.popInt(context);
        const b = this.popInt(context);
        const a = this.popInt(context);

        const denominator = (c << BigInt('64')) + d;
        const numerator = (a << BigInt('64')) + b;

        const result = numerator / denominator;
        const maxUint64 = BigInt("0xFFFFFFFFFFFFFFFF");
        const x = result & maxUint64;
        const w = result >> BigInt('64');

        const remainder = numerator % denominator;
        const z = remainder & maxUint64;
        const y = remainder >> BigInt('64');

        this.pushInt(context, w);
        this.pushInt(context, x);
        this.pushInt(context, y);
        this.pushInt(context, z);
    }
}
