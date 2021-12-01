import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppParamsGet } from "../../lib/opcodes/app_params_get";

describe("app_params_get opcode", () => {

    it ("can execute", async () => {

        const appId = 3;
        const fieldName = "AppGlobalNumUint";

        const token: any = {
            operands: [
                fieldName,
            ],
        };
        const opcode = new AppParamsGet(token, opcodeDefs.app_params_get);
        opcode.validateOperand();

        const context: any = {
            requestValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`appParams.${appId}.${fieldName}`);
                return makeBigInt(BigInt(13));
            },
            stack: [                
                makeBigInt(BigInt(appId)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(13);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });

    it ("returns zero when app not found", async () => {

        const token: any = {
            operands: [
                "AppGlobalNumUint",
            ],
        };
        const opcode = new AppParamsGet(token, opcodeDefs.app_params_get);
        opcode.validateOperand();

        const context: any = {
            requestValue: () =>{
                return undefined; // No value.
            },
            stack: [                
                makeBigInt(BigInt(3)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(0);
        expect(Number(context.stack[1]?.value)).toEqual(0);
    });

});