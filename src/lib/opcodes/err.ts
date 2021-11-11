import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class Err extends Opcode {
    
    execute(context: IExecutionContext): void {
        throw new Error(`Program triggered error using "err" opcode.`);
    }
}
