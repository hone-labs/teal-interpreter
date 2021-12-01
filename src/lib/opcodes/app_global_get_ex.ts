import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalGetEx extends Opcode {

    async execute(context: IExecutionContext) {
        const globalName = Buffer.from(this.popBytes(context)).toString();
        const appId = Number(this.popInt(context));
        const value = await context.requestValue(`appGlobals.${appId}.${globalName}`);
        if (value === undefined) {
            // The value doesn't exist.
            this.pushInt(context, BigInt(0));
            this.pushInt(context, BigInt(0));
            return;
        }

        context.stack.push(value);
        this.pushInt(context, BigInt(1));
    }
}
