import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class ItxnBegin extends Opcode {
   
    execute(context: IExecutionContext): void {
        //
        // Just a noop.
        //
    }
}
