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

    execute(context: IExecutionContext): void {
        
        const appId = this.popInt(context).toString();
        const appParams = context.appParams[appId];
        if (appParams === undefined) {
            // App not found.
            this.pushInt(context, BigInt(0));
            this.pushInt(context, BigInt(0));
            return;
        }

        const value = appParams[this.fieldName];
        if (value === undefined) {
            throw new Error(`Expected value "${this.fieldName}" under asset "appParams.${appId}.${this.fieldName}" in your configuration.`);
        }

        context.stack.push(value);
        this.pushInt(context, BigInt(1));
    }
}
