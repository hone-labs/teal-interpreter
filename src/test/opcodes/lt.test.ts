import { makeBigInt } from "../../lib/context";
import { Lt } from "../../lib/opcodes/lt";

describe("lt opcode", () => {

    it ("can execute", () => {

        const token: any = {
            opcode: "<",
            operands: [],            
        };
        const context: any = {
            stack: [
                makeBigInt(BigInt(2)),
                makeBigInt(BigInt(10)), 
            ],
        };
        const opcode = new Lt(token);
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(1);
    });
}); 