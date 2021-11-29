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
        const account = await context.requireAccount(accountName, this.token.opcode);
        const assetHoldings = account.assetHoldings[assetId];
        if (assetHoldings === undefined) {
            // Asset not found.
            this.pushInt(context, BigInt(0));
            this.pushInt(context, BigInt(0));
            return;
        }

        const value = assetHoldings[this.fieldName];
        if (value === undefined) {
            throw new Error(`Failed to find asset field "${this.fieldName}" under "assets.${assetId}.fields", under account "accounts.${accountName}" in your configuration. Please add this field.`);
        }

        context.stack.push(value);
        this.pushInt(context, BigInt(1));
    }
}
