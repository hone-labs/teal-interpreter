import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class Balance extends Opcode {

    async execute(context: IExecutionContext) {
        const accountName = decodeAddress(this.popBytes(context));
        const account = await context.requireAccount(accountName, this.token.opcode);
        if (account.balance === undefined) {
            throw new Error(`"balance" not set for account "${accountName}", please add field "balance" to this account in your configuration.`);
        }
        this.pushInt(context, BigInt(account.balance));
    }
}
