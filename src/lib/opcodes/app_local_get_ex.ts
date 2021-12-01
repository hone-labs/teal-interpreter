import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AppLocalGetEx extends Opcode {

    async execute(context: IExecutionContext) {
        const localName = Buffer.from(this.popBytes(context)).toString();
        const appId = Number(this.popInt(context)).toString();
        const accountName = decodeAddress(this.popBytes(context));
        const value = await context.requestValue(`accounts.${accountName}.appLocals.${appId}.${localName}`);
        if (value !== undefined) {
            context.stack.push(value);
            this.pushInt(context, BigInt(1));
            return;
        }

        // Not found.
        this.pushInt(context, BigInt(0));
        this.pushInt(context, BigInt(0));
    }
}
