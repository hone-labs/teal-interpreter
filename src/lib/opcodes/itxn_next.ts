import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class ItxnNext extends Opcode {
   
    execute(context: IExecutionContext): void {

        if (context.itxn === undefined) {
            throw new Error(`Inner transaction not started with "itxn_begin".`);        
        }

        if (context.submittedItxns === undefined) {
            context.submittedItxns = [];
        }

        context.submittedItxns.push(context.itxn);
        context.itxn = {};
    }
}
