import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";

export class AssetParamsGet extends Opcode {
    
    //
    // The name of the field to get from the asset.
    //
    private fieldName!: string;

    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
    }

    execute(context: IExecutionContext): void {
        
        const assetId = this.popInt(context).toString();
        const asset = context.assets[assetId];
        if (asset === undefined) {
            // Asset not found.
            this.pushInt(context, BigInt(0));
            this.pushInt(context, BigInt(0));
            return;
        }

        const value = asset.fields[this.fieldName];
        if (value === undefined) {
            throw new Error(`Failed to find asset params field ${this.fieldName} under asset ${assetId} in your configuration. Please add this field.`);
        }

        context.stack.push(value);
        this.pushInt(context, BigInt(1));
    }
}
