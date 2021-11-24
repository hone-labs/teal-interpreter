import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AppLocalGet extends Opcode {

    execute(context: IExecutionContext): void {
        const localName = Buffer.from(this.popBytes(context)).toString();
        const accountName = decodeAddress(this.popBytes(context));
        const account = context.accounts[accountName];
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
