import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class Balance extends Opcode {

    async execute(context: IExecutionContext) {
        const accountName = decodeAddress(this.popBytes(context));
        const value = await context.requireValue(`accounts.${accountName}.balance`, this.token.opcode);
        context.stack.push(value);
    }
}
