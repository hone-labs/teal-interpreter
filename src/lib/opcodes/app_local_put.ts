import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppLocalPut extends Opcode {

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
        const localName = Buffer.from(this.popBytes(context)).toString();
        const addr = this.popBytes(context);
        const accountName = Buffer.from(addr).toString();
        const account = context.accounts[accountName];

        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }
        
        if (account.locals === undefined) {
            throw new Error(`Locals not set for account "${accountName}", please add field "locals" to this account in your configuration.`);
        }

        account.locals[localName] = value;
    }
}
