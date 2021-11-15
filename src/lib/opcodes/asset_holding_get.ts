import { Opcode } from "../opcode";
import { IExecutionContext, makeBigInt } from "../context";

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
        const accountName = Buffer.from(context.stack.pop()!.value as Uint8Array).toString();
        const account = context.accounts[accountName];
        if (account === undefined) {
            throw new Error(`Account "${accountName}" not found, please add this account to your configuration.`);
        }

        const asset = account.assets[assetId];
        if (asset === undefined) {
            throw new Error(`Asset "${assetId}" not found under account "${accountName}", please add this asset to the account in your configuration.`);
        }

        const value = asset.fields[this.fieldName];
        if (value === undefined) {
            throw new Error(`Failed to find asset field "${this.fieldName}" under asset ${assetId}, under account "${accountName}" in your configuration. Please add this field.`);
        }

        context.stack.push(value);
        context.stack.push(makeBigInt(BigInt(1))); //TODO: Under what circumstances is 0 pushed?
    }
}
