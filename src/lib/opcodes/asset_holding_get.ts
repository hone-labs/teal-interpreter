import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { encodeAddress } from "algosdk";

export class AssetHoldingGet extends Opcode {

    //
    // The name of the field to get from the asset.
    //
    private fieldName!: string;

    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
    }

    execute(context: IExecutionContext): void {

        const assetId = Number(this.popInt(context)).toString();
        const accountName = encodeAddress(this.popBytes(context));
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }

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
