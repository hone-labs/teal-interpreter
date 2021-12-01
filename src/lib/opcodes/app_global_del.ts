import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalDel extends Opcode {

    async execute(context: IExecutionContext) {
        const globalName = Buffer.from(this.popBytes(context)).toString();
        const appGlobals = context.appGlobals["0"];
        if (appGlobals !== undefined) {
            delete appGlobals[globalName];
        }
    }
}
