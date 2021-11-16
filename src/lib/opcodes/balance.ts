import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Balance extends Opcode {

    execute(context: IExecutionContext): void {
        const addr = context.stack.pop()!.value as Uint8Array;
        const accountName = Buffer.from(addr).toString();
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }
        if (account.balance === undefined) {
            throw new Error(`Balance not set for account "${accountName}", please add field "balance" to this account in your configuration.`);
        }
        this.pushInt(context, BigInt(account.balance!));
    }
}
