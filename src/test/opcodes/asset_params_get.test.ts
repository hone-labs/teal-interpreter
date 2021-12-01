import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AssetParamsGet } from "../../lib/opcodes/asset_params_get";

describe("asset_params_get opcode", () => {

    it ("can execute", async () => {

        const appId = 3;
        const fieldName = "AssetTotal";
        const token: any = {
            operands: [
                fieldName,
            ],
        };
        const opcode = new AssetParamsGet(token, opcodeDefs.asset_params_get);
        opcode.validateOperand();

        const context: any = {
            requestValue: (fieldPath: string) => {
                expect(fieldPath).toEqual(`assetParams.${appId}.${fieldName}`);
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

    it ("returns zero when asset not found", async () => {

        const token: any = {
            operands: [
                "AssetTotal",
            ],
        };
        const opcode = new AssetParamsGet(token, opcodeDefs.asset_params_get);
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