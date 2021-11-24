import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Retsub extends Opcode {
   
    validateContext(context: IExecutionContext) {
        if (context.callstack.length < 1) {
            throw new Error(`Expected at least one entry on the callstack.`);
        }
    }
    
    execute(context: IExecutionContext): number {
        return context.callstack.pop()!;
    }
}
