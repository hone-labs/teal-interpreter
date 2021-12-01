import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class MinBalance extends Opcode {

    async execute(context: IExecutionContext) {
        const accountName = decodeAddress(this.popBytes(context));
        const value = await context.requireValue(`accounts.${accountName}.minBalance`, this.token.opcode);
        context.stack.push(value);
    }
}
