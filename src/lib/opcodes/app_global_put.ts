import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalPut extends Opcode {

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
        const globalName = Buffer.from(this.popBytes(context)).toString();
        let appGlobals = context.appGlobals["0"];
        if (appGlobals === undefined) {
            appGlobals = context.appGlobals["0"] = {
            };
        }

        appGlobals[globalName] = value;
    }
}
