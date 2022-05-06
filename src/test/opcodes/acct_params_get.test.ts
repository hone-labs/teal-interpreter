import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AccountParamsGet } from "../../lib/opcodes/acct_params_get";
import { encodeAddress } from "../../lib/convert";

describe("acct_params_get opcode", () => {

    it ("can execute", async () => {

        const accountName = "john";
        const fieldName = "AcctBalance";
        const token: any = {
            operands: [
                fieldName,
            ],
        };
        const opcode = new AccountParamsGet(token, opcodeDefs.acct_params_get);
        opcode.validateOperand();

        const context: any = {
            requestValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`accountParams.${accountName}.${fieldName}`);
                return makeBigInt(BigInt(13));
            },
            stack: [                
                makeBytes(encodeAddress(accountName)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(13);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });

    it ("returns zero for non-positive algos", async () => {

        const token: any = {
            operands: [
                "AcctBalance",
            ],
        };
        const opcode = new AccountParamsGet(token, opcodeDefs.acct_params_get);
        opcode.validateOperand();

        const context: any = {
            requestValue: () =>{
                return makeBigInt(BigInt(0));
            },
            stack: [                
                makeBytes(encodeAddress("john")),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(0);
        expect(Number(context.stack[1]?.value)).toEqual(0);
    });

});