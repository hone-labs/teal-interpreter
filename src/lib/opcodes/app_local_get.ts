import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AppLocalGet extends Opcode {

    async execute(context: IExecutionContext) {
        const localName = Buffer.from(this.popBytes(context)).toString();
        const accountName = decodeAddress(this.popBytes(context));
        const value = await context.requestValue(`accounts.${accountName}.appLocals.0.${localName}`);
        if (value === undefined) {
            this.pushInt(context, BigInt(0)); // Value does not exist.        
            return;
        }

        context.stack.push(value);
    }
}
