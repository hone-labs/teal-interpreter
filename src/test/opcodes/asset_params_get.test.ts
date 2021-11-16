import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AssetParamsGet } from "../../lib/opcodes/asset_params_get";

describe("asset_params_get opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "AssetTotal",
            ],
        };
        const opcode = new AssetParamsGet(token, opcodeDefs.asset_params_get);
        opcode.validateOperand();

        const context: any = {
            assets: {
                "3": {
                    fields: {
                        AssetTotal: makeBigInt(BigInt(13)),
                    },
                },
            },
            stack: [                
                makeBigInt(BigInt(3)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(13);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });

    it ("returns zero when asset not found", () => {

        const token: any = {
            operands: [
                "AssetTotal",
            ],
        };
        const opcode = new AssetParamsGet(token, opcodeDefs.asset_params_get);
        opcode.validateOperand();

        const context: any = {
            assets: {
                // No asset.
            },
            stack: [                
                makeBigInt(BigInt(3)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(0);
        expect(Number(context.stack[1]?.value)).toEqual(0);
    });

    it("throws when field is not set", () => {
        
        const token: any = {
            operands: [
                "AssetTotal",
            ],
        };
        const opcode = new AssetParamsGet(token, opcodeDefs.asset_params_get);
        opcode.validateOperand();

        const context: any = {
            assets: {
                "3": {
                    fields: {
                        // No field.
                    },
                },
            },
            stack: [                
                makeBigInt(BigInt(3)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });    
});