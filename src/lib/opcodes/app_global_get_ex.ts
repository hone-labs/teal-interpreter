import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalGetEx extends Opcode {

    execute(context: IExecutionContext): void {
        const globalName = Buffer.from(this.popBytes(context)).toString();
        const appId = Number(this.popInt(context));

        const application = context.applications[appId];
        if (application === undefined) {
            // Application not found.
            this.pushInt(context, BigInt(0));
            this.pushInt(context, BigInt(0));
            return;
        }

        const value = application.globals[globalName];
        if (value === undefined) {
            throw new Error(`Application global "${globalName}" not set for application ${appId}, please add "${globalName}" field under the "applications.${appId}.globals" in your configuration.`);
        }

        context.stack.push(value);
        this.pushInt(context, BigInt(1));
    }
}
