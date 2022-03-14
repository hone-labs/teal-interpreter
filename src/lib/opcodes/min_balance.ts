import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";
import { decodeAddress } from "../convert";

export class MinBalance extends Opcode {

    async execute(context: IExecutionContext) {
        const accountName = decodeAddress(this.popBytes(context));
        const value = await context.requireValue<number>(`accounts.${accountName}.minBalance`, this.token);
        context.stack.push(makeBigInt(BigInt(value)));
    }
}
