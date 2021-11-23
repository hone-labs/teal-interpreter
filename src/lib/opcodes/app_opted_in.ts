import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { encodeAddress } from "algosdk";

export class AppOptedIn extends Opcode {

    execute(context: IExecutionContext): void {
        const appId = Number(this.popInt(context));
        const accountName = encodeAddress(this.popBytes(context));
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this to "accounts" in your configuration.`);
        }

        if (account.appsOptedIn.has(appId.toString())) {
            this.pushInt(context, BigInt(1));
        }
        else {
            this.pushInt(context, BigInt(0));
        }
    }
}
