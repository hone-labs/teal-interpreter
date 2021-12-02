import { Opcode } from "../opcode";
import { IAccount, IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AppLocalPut extends Opcode {

    async execute(context: IExecutionContext): Promise<void> {
        const value = context.stack.pop()!;
        const localName = Buffer.from(this.popBytes(context)).toString();
        const accountName = decodeAddress(this.popBytes(context));
        const account = await context.requireValue<IAccount>(`accounts.${accountName}`, this.token.opcode);
        let appLocals = account.appLocals["0"];
        if (appLocals === undefined) {
            appLocals = account.appLocals["0"] = {};            
        }

        appLocals[localName] = value;
    }
}
