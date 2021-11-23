import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalDel extends Opcode {

    execute(context: IExecutionContext): void {
        const globalName = Buffer.from(this.popBytes(context)).toString();

        const application = context.apps["0"];
        if (application === undefined) {
            throw new Error(`Expected "apps.0" (the "current" application) field to be set in your configuration.`);
        }

        delete application.globals[globalName];
    }
}
