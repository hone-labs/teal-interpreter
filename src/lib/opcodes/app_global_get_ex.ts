import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalGetEx extends Opcode {

    execute(context: IExecutionContext): void {
        const globalName = Buffer.from(this.popBytes(context)).toString();
        const appId = Number(this.popInt(context));

        const appGlobals = context.appGlobals[appId.toString()];
        if (appGlobals === undefined) {
            // Application not found.
            throw new Error(`Expected "appGlobals.${appId}" field to be set in your configuration.`);

        }

        const value = appGlobals[globalName];
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
