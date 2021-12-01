import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AssetHoldingGet } from "../../lib/opcodes/asset_holding_get";

describe("asset_holding_get opcode", () => {

    it ("can execute", async () => {

        const addr = "john";
        const assetId = "3";
        const fieldName = "AssetBalance";
        const token: any = {
            operands: [ 
                fieldName,
            ],
        };
        const opcode = new AssetHoldingGet(token, opcodeDefs.asset_holding_get);
        opcode.validateOperand();

        const context: any = {
            requestValue: async (fieldPath: string) => {
                expect(fieldPath).toEqual(`accounts.${addr}.assetHoldings.${assetId}.${fieldName}`);
                return makeBigInt(BigInt(12));
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBigInt(BigInt(3)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(12);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });

    it ("returns zero when asset not found", async () => {

        const addr = "john";
        const assetId = "3";
        const fieldName = "AssetBalance";
        const token: any = {
            operands: [ 
                fieldName,
            ],
        };
        const opcode = new AssetHoldingGet(token, opcodeDefs.asset_holding_get);
        opcode.validateOperand();

        const context: any = {
            requestValue: async (fieldPath: string) => {
                expect(fieldPath).toEqual(`accounts.${addr}.assetHoldings.${assetId}.${fieldName}`);
                return undefined; // No value.
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBigInt(BigInt(3)),
            ],
        };
        await opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(0);
        expect(Number(context.stack[1]?.value)).toEqual(0);
    });
 
});