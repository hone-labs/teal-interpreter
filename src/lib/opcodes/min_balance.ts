import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class MinBalance extends Opcode {

    execute(context: IExecutionContext): void {
        const accountName = Buffer.from(this.popBytes(context)).toString();
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }
        if (account.minBalance === undefined) {
            throw new Error(`"minBalance" not set for account "${accountName}", please add field "minBalance" to this account in your configuration.`);
        }
        this.pushInt(context, BigInt(account.minBalance));
    }
}