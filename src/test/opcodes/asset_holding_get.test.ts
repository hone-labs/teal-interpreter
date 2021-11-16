import { makeBigInt, makeBytes } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AssetHoldingGet } from "../../lib/opcodes/asset_holding_get";

describe("asset_holding_get opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [ 
                "AssetBalance",
            ],
        };
        const opcode = new AssetHoldingGet(token, opcodeDefs.asset_holding_get);
        opcode.validateOperand();

        const context: any = {
            accounts: {
                "AAAA": {
                    assets: {
                        "3": {
                            fields: {
                                AssetBalance: makeBigInt(BigInt(12)),
                            },
                        },
                    },
                },
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBigInt(BigInt(3)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(12);
        expect(Number(context.stack[1]?.value)).toEqual(1);
    });

    it ("returns zero when asset not found", () => {

        const token: any = {
            operands: [ 
                "AssetBalance",
            ],
        };
        const opcode = new AssetHoldingGet(token, opcodeDefs.asset_holding_get);
        opcode.validateOperand();

        const context: any = {
            accounts: {
                "AAAA": {
                    assets: {
                        // No asset.
                    },
                },
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBigInt(BigInt(3)),
            ],
        };
        opcode.execute(context);

        expect(context.stack.length).toEqual(2);
        expect(Number(context.stack[0]?.value)).toEqual(0);
        expect(Number(context.stack[1]?.value)).toEqual(0);
    });

    it("throws when account is not set", () => {

        const token: any = {
            operands: [ 
                "AssetBalance",
            ],
        };
        const opcode = new AssetHoldingGet(token, opcodeDefs.asset_holding_get);
        opcode.validateOperand();

        const context: any = {
            accouts: {
                // No account.
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBigInt(BigInt(3)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when field is not set", () => {
        
        const token: any = {
            operands: [ 
                "AssetBalance",
            ],
        };
        const opcode = new AssetHoldingGet(token, opcodeDefs.asset_holding_get);
        opcode.validateOperand();

        const context: any = {
            accounts: {
                "AAAA": {
                    assets: {
                        "3": {
                            fields: {
                                // No field.
                            },
                        },
                    },
                },
            },
            stack: [                
                makeBytes(new Uint8Array(Buffer.from("AAAA"))),
                makeBigInt(BigInt(3)),
            ],
        };

        expect(() => opcode.execute(context)).toThrow();
    });    
});