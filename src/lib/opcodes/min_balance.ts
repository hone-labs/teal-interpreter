import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class MinBalance extends Opcode {

    async execute(context: IExecutionContext) {
        const accountName = decodeAddress(this.popBytes(context));
        const account = await context.requireAccount(accountName, this.token.opcode);
        if (account.minBalance === undefined) {
            throw new Error(`"minBalance" not set for account "${accountName}", please add field "minBalance" to this account in your configuration.`);
        }
        this.pushInt(context, BigInt(account.minBalance));
    }
}
