import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppGlobalPut extends Opcode {

    execute(context: IExecutionContext): void {
        const value = context.stack.pop()!;
        const globalName = Buffer.from(this.popBytes(context)).toString();
        let application = context.apps["0"];
        if (application === undefined) {
            application = context.apps["0"] = {
                globals: {                    
                },
            };
        }

        application.globals[globalName] = value;
    }
}
