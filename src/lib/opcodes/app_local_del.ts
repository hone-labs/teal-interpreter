import { Opcode } from "../opcode";
import { IAccount, IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AppLocalDel extends Opcode {

    async execute(context: IExecutionContext) {
        const localName = Buffer.from(this.popBytes(context)).toString();
        const accountName = decodeAddress(this.popBytes(context));
        const account = await context.requireValue<IAccount>(`accounts.${accountName}`, this.token.opcode);
        const appLocals = account.appLocals["0"];
        if (appLocals !== undefined) {
            delete appLocals[localName];
        }       
    }
}
