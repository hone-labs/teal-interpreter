import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalPut extends Opcode {

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
        const globalName = Buffer.from(this.popBytes(context)).toString();

        if (context.application === undefined) {
            throw new Error(`"application" field not set, please add field "application" to your configuration.`);
        }

        if (context.application.globals === undefined) {
            throw new Error(`"application.globals" field not set, please add field "application.globals" to your configuration.`);
        }

        context.application.globals[globalName] = value;
    }
}
