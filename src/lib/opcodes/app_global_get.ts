import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalGet extends Opcode {

    async execute(context: IExecutionContext) {
        const globalName = Buffer.from(this.popBytes(context)).toString();
        const value = await context.requireValue(`appGlobals.0.${globalName}`, this.token.opcode);
        context.stack.push(value);
    }
}
