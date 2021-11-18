import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { encodeAddress } from "algosdk";

export class AppLocalDel extends Opcode {

    execute(context: IExecutionContext): void {
        const localName = Buffer.from(this.popBytes(context)).toString();
        const accountName = encodeAddress(this.popBytes(context));
        const account = context.accounts[accountName];

        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }
        
        delete account.locals[localName];
    }
}
