import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AppLocalGet extends Opcode {

    async execute(context: IExecutionContext) {
        const localName = Buffer.from(this.popBytes(context)).toString();
        const accountName = decodeAddress(this.popBytes(context));
        const account = await context.requireAccount(accountName, this.token.opcode);
        const appLocals = account.appLocals["0"]; 
        if (appLocals !== undefined) {
            const value = appLocals[localName];
            if (value !== undefined) {
                context.stack.push(value);
                return;
            }
        }

        this.pushInt(context, BigInt(0)); // Value does not exist.        
    }
}
