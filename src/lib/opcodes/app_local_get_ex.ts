import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { encodeAddress } from "algosdk";

export class AppLocalGetEx extends Opcode {

    execute(context: IExecutionContext): void {
        const localName = Buffer.from(this.popBytes(context)).toString();
        const appId = Number(this.popInt(context));
        const accountName = encodeAddress(this.popBytes(context));

        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add field "accounts.${accountName}" to your configuration.`);
        }

        const appLocals = account.appLocals[appId];
        if (appLocals !== undefined) {
            const value = appLocals[localName];
            if (value !== undefined) {
                context.stack.push(value);
                this.pushInt(context, BigInt(1));
                return;
            }
        }

        this.pushInt(context, BigInt(0));
        this.pushInt(context, BigInt(0));
    }
}
