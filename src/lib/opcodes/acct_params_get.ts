import { Opcode } from "../opcode";
import { IExecutionContext } from "../context";
import { decodeAddress } from "../convert";
import { InterpreterError } from "../error";

export class AccountParamsGet extends Opcode {
    
    //
    // The name of the field to get from the asset.
    //
    private fieldName!: string;

    validateOperand() {
        super.validateOperand();

        this.fieldName = this.token.operands[0];
    }

    async execute(context: IExecutionContext) {

        const accountName = decodeAddress(this.popBytes(context));
        const key = `accountParams.${accountName}.${this.fieldName}`;
        const value = await context.requestValue(key);
        if (value === undefined) {
            const msg = `Value "${key}" not found for account ${accountName}.`;
            throw new InterpreterError(msg, this.token);
        }

        context.stack.push(value);
        this.pushInt(context, value.type === "bigint" && Number(value.value) <= 0 ? BigInt(0) : BigInt(1));
    }
}
