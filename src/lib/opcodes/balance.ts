import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class Balance extends Opcode {

    execute(context: IExecutionContext): void {
        const accountName = decodeAddress(this.popBytes(context));
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this to "accounts" in your configuration.`);
        }
        if (account.balance === undefined) {
            throw new Error(`"balance" not set for account "${accountName}", please add field "balance" to this account in your configuration.`);
        }
        this.pushInt(context, BigInt(account.balance));
    }
}
