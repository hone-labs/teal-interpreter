import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AppLocalPut extends Opcode {

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
        const localName = Buffer.from(this.popBytes(context)).toString();
        const accountName = decodeAddress(this.popBytes(context));
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }

        let appLocals = account.appLocals["0"];
        if (appLocals === undefined) {
            appLocals = account.appLocals["0"] = {};            
        }

        appLocals[localName] = value;
    }
}
