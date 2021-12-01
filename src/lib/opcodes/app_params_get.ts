import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AppParamsGet extends Opcode {
    
    //
    // The name of the field to get from the asset.
    //
    private fieldName!: string;

    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
    }

    async execute(context: IExecutionContext) {
        
        const appId = this.popInt(context).toString();
        const value = await context.requestValue(`appParams.${appId}.${this.fieldName}`);
        if (value === undefined) {
            // App not found.
            this.pushInt(context, BigInt(0));
            this.pushInt(context, BigInt(0));
            return;
        }

        context.stack.push(value);
        this.pushInt(context, BigInt(1));
    }
}
