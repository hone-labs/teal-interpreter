import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";

export class AssetHoldingGet extends Opcode {

    //
    // The name of the field to get from the asset.
    //
    private fieldName!: string;

    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
    }

    async execute(context: IExecutionContext) {

        const assetId = Number(this.popInt(context)).toString();
        const accountName = decodeAddress(this.popBytes(context));
        const value = await context.requestValue(`accounts.${accountName}.assetHoldings.${assetId}.${this.fieldName}`);
        if (value === undefined) {
            // Asset not found.
            this.pushInt(context, BigInt(0));
            this.pushInt(context, BigInt(0));
            return;
        }

        context.stack.push(value);
        this.pushInt(context, BigInt(1));
    }
}
