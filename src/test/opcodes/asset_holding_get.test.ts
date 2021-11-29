import { makeBigInt, makeBytes } from "../../lib/context";
import { encodeAddress } from "../../lib/convert";
import { opcodeDefs } from "../../lib/opcodes";
import { AssetHoldingGet } from "../../lib/opcodes/asset_holding_get";

describe("asset_holding_get opcode", () => {

    it ("can execute", async () => {

        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const account = {
            assetHoldings: {
                "3": {
                    AssetBalance: makeBigInt(BigInt(12)),
                },
            },
        };        
        const token: any = {
            operands: [ 
                "AssetBalance",
            ],
        };
        const opcode = new AssetHoldingGet(token, opcodeDefs.asset_holding_get);
        opcode.validateOperand();

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
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

        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const account = {
            assetHoldings: {
                // No asset holdings.
            },
        };        
        const token: any = {
            operands: [ 
                "AssetBalance",
            ],
        };
        const opcode = new AssetHoldingGet(token, opcodeDefs.asset_holding_get);
        opcode.validateOperand();

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
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

    it("throws when field is not set", async () => {
        
        const addr = "7JOPVEP3ABJUW5YZ5WFIONLPWTZ5MYX5HFK4K7JLGSIAG7RRB42MNLQ224";
        const account = {
            assetHoldings: {
                "3": {
                    // No field.
                },
            },
        };        
        const token: any = {
            operands: [ 
                "AssetBalance",
            ],
        };
        const opcode = new AssetHoldingGet(token, opcodeDefs.asset_holding_get);
        opcode.validateOperand();

        const context: any = {
            requireAccount: async (accountName: string) => {
                expect(accountName).toEqual(addr);
                return account;
            },
            stack: [                
                makeBytes(encodeAddress(addr)),
                makeBigInt(BigInt(3)),
            ],
        };

        await expect(() => opcode.execute(context)).rejects.toThrow();
    });    
});