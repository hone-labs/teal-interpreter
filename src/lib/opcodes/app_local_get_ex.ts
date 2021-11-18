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

        const application = account.applications[appId];
        if (application === undefined) {
            throw new Error(`Application "${appId}" not found under account "${accountName}" not found, please add field "accounts.${accountName}.applications.${appId}" to your configuration.`);
        }

        const value = application.locals[localName];
        if (value === undefined) {
            throw new Error(`Local not set for application "${appId}" under account "${accountName}", please add a local to your configuration.`);
        }

        context.stack.push(value);
        this.pushInt(context, BigInt(1));
    }
}
