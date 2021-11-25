import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { AppParamsGet } from "../../lib/opcodes/app_params_get";

describe("app_params_get opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "AppGlobalNumUint",
            ],
        };
        const opcode = new AppParamsGet(token, opcodeDefs.app_params_get);
        opcode.validateOperand();

        const context: any = {
            appParams: {
                "3": {
                    AppGlobalNumUint: makeBigInt(BigInt(13)),
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

    it ("returns zero when app not found", () => {

        const token: any = {
            operands: [
                "AppGlobalNumUint",
            ],
        };
        const opcode = new AppParamsGet(token, opcodeDefs.app_params_get);
        opcode.validateOperand();

        const context: any = {
            appParams: {
                // No apps.
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
                "AppGlobalNumUint",
            ],
        };
        const opcode = new AppParamsGet(token, opcodeDefs.app_params_get);
        opcode.validateOperand();

        const context: any = {
            appParams: {
                "3": {
                    // No field.
                },
            },
            stack: [                
                makeBigInt(BigInt(3)),
            ],
        };
        expect(() => opcode.execute(context)).toThrow();
    });    
});