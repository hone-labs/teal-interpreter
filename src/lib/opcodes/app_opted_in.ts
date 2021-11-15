import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

export class AppOptedIn extends Opcode {

    execute(context: IExecutionContext): void {
        const appId = Number(this.popInt(context));
        const accountName = Buffer.from(context.stack.pop()!.value as Uint8Array).toString();
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this to "accounts" in your configuration.`);
        }

        const application = account.applications[appId];
        if (application === undefined) {
            throw new Error(`Application "${appId}" not found under account "${accountName}", please add this to your configuration.`);
        }

        if (application.optedIn) {
            context.stack.push(makeBigInt(BigInt(1)));
        }
        else {
            context.stack.push(makeBigInt(BigInt(0)));
        }
    }
}
