import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

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
            throw new Error(`Asset ${assetId} not found in your configuration. Please add an "assets.${assetId}" field to you configuration.`);
        }

        const value = asset.fields[this.fieldName];
        if (value === undefined) {
            throw new Error(`Failed to find asset params field ${this.fieldName} under asset ${assetId} in your configuration. Please add this field.`);
        }

        context.stack.push(value);
        context.stack.push(makeBigInt(BigInt(1))); //TODO: Under what circumstances is 0 pushed?
    }
}
