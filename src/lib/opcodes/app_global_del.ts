import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalDel extends Opcode {

    execute(context: IExecutionContext): void {
        const globalName = Buffer.from(this.popBytes(context)).toString();

        const appGlobals = context.appGlobals["0"];
        if (appGlobals === undefined) {
            throw new Error(`Expected "appGlobals.0" (the "current" application) field to be set in your configuration.`);
        }

        delete appGlobals[globalName];
    }
}
