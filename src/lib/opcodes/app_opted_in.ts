import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AppOptedIn extends Opcode {

    async execute(context: IExecutionContext) {
        const appId = Number(this.popInt(context));
        const accountName = decodeAddress(this.popBytes(context));
        const account = await context.requireAccount(accountName, this.token.opcode);
        if (account.appsOptedIn.includes(appId.toString())) {
            this.pushInt(context, BigInt(1));
        }
        else {
            this.pushInt(context, BigInt(0));
        }
    }
}
