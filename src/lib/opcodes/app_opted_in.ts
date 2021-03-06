import { Opcode } from "../opcode";
import { IAccount, IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AppOptedIn extends Opcode {

    async execute(context: IExecutionContext) {
        const appId = Number(this.popInt(context));
        const accountName = decodeAddress(this.popBytes(context));
        const account = await context.requireValue<IAccount>(`accounts.${accountName}`, this.token);
        if (account.appsOptedIn.includes(appId.toString())) {
            this.pushInt(context, BigInt(1));
        }
        else {
            this.pushInt(context, BigInt(0));
        }
    }
}
