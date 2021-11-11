import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class AppLocalPut extends Opcode {

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
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

        account.locals[localName] = value;
    }
}
