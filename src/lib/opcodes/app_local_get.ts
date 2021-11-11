import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class AppLocalGet extends Opcode {

    execute(context: IExecutionContext): void {
        const localName = Buffer.from(context.stack.pop()!.value as Uint8Array).toString();
        const addr = context.stack.pop()!.value as Uint8Array;
        const accountName = Buffer.from(addr).toString();
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }
        if (account.locals === undefined) {
            throw new Error(`Locals not set for account "${accountName}", please add field "locals" to this account in your configuration.`);
        }
        const value = account.locals[localName];
        if (value === undefined) {
            throw new Error(`Local "${localName}" not set for account "${accountName}", please add "${localName}" field under the "locals" to this account in your configuration.`);
        }

        if (Array.isArray(value)) {
            if (Array.isArray(value)) {
                throw new Error(`Expected local "${localName}" in account ${accountName} not to be an array when used with opcode ${this.token.opcode}.`);
            }
        }

        context.stack.push(value);
    }
}
