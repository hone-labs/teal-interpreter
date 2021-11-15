import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class AppGlobalGetEx extends Opcode {

    execute(context: IExecutionContext): void {
        const globalName = Buffer.from(context.stack.pop()!.value as Uint8Array).toString();
        const appId = Number(this.popInt(context));

        if (context.applications === undefined) {
            throw new Error(`"applications" field not set, please add field "applications" to your configuration.`);
        }

        const application = context.applications[appId];
        if (application === undefined) {
            throw new Error(`Field for application ${appId} not found, please add field "applications.${appId}" to your configuration.`);
        }

        if (application.globals === undefined) {
            throw new Error(`"globals" field not set, please add field "applications.${appId}.globals" to your configuration.`);
        }

        const value = application.globals[globalName];
        if (value === undefined) {
            throw new Error(`Application global "${globalName}" not set for application ${appId}, please add "${globalName}" field under the "applications.${appId}.globals" in your configuration.`);
        }

        if (Array.isArray(value)) {
            if (Array.isArray(value)) {
                throw new Error(`Expected application global "${globalName}" not to be an array when used with opcode ${this.token.opcode}.`);
            }
        }

        context.stack.push(value);
        context.stack.push(makeBigInt(BigInt(1))); //TODO: Under what situation can this be 0?
    }
}
