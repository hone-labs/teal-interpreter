import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalGet extends Opcode {

    execute(context: IExecutionContext): void {
        const globalName = Buffer.from(this.popBytes(context)).toString();

        const application = context.apps["0"];
        if (application === undefined) {
            throw new Error(`Expected "apps.0" (the "current" application) field to be set in your configuration.`);
        }

        const value = application.globals[globalName];
        if (value === undefined) {
            throw new Error(`Application global "${globalName}" not set, please add "${globalName}" field under the "application.globals" in your configuration.`);
        }

        context.stack.push(value);
    }
}
