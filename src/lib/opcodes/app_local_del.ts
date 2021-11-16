import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppLocalDel extends Opcode {

    execute(context: IExecutionContext): void {
        const localName = Buffer.from(context.stack.pop()!.value as Uint8Array).toString();
        const addr = context.stack.pop()!.value as Uint8Array;
        const accountName = Buffer.from(addr).toString();
        const account = context.accounts[accountName];

        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }
        
        delete account.locals[localName];
    }
}
