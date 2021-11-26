import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class ItxnSubmit extends Opcode {
   
    execute(context: IExecutionContext): void {

        if (context.itxn === undefined) {
            throw new Error(`Inner transaction not started with "itxn_begin".`);        
        }

        context.lastItxn = context.itxn;
        context.itxn = undefined;
    }
}
