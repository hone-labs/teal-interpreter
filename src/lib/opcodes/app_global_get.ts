import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class AppGlobalGet extends Opcode {

    execute(context: IExecutionContext): void {
        const globalName = Buffer.from(context.stack.pop()!.value as Uint8Array).toString();
        if (context.application === undefined) {
            throw new Error(`"application" field not set, please add field "application" to your configuration.`);
        }

        if (context.application.globals === undefined) {
            throw new Error(`"application.globals" field not set, please add field "application.globals" to your configuration.`);
        }

        const value = context.application.globals[globalName];
        if (value === undefined) {
            throw new Error(`Application global "${globalName}" not set, please add "${globalName}" field under the "application.globals" in your configuration.`);
        }

        if (Array.isArray(value)) {
            if (Array.isArray(value)) {
                throw new Error(`Expected application global "${globalName}" not to be an array when used with opcode ${this.token.opcode}.`);
            }
        }

        context.stack.push(value);
    }
}
