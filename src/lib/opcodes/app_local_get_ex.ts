import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AppLocalGetEx extends Opcode {

    async execute(context: IExecutionContext) {
        const localName = Buffer.from(this.popBytes(context)).toString();
        const appId = Number(this.popInt(context)).toString();
        const accountName = decodeAddress(this.popBytes(context));
        const account = await context.requireAccount(accountName, this.token.opcode);
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
