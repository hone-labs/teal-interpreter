import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Bnz } from "../../lib/opcodes/bnz";

describe("bnz opcode", () => {

    it("throws when branch target doesn't exist", () => {

        const token: any = {
            operands: [
                "a-label",
            ],
        };
        const opcode = new Bnz(token, opcodeDefs.bnz)

        const context: any = {
            branchTargets: {
                // No branch target.
            },
        };
        opcode.validateOperand();
        expect(() => opcode.validateContext(context)).toThrow();
    });

    it ("can conditionally follow branch", () => {

        const token: any = {
            operands: [
                "a-label",
            ],
        };
        const opcode = new Bnz(token, opcodeDefs.bnz);
        opcode.validateOperand();

        const context: any = {
            branchTargets: {
                "a-label": 12,
            },
            stack: [
                makeBigInt(BigInt(15)),
            ],
        };
        opcode.validateContext(context);;
        expect(opcode.execute(context)).toEqual(12);
    });

    it ("does not follow branch when condition is zero", () => {

        const token: any = {
            operands: [
                "a-label",
            ],
        };
        const opcode = new Bnz(token, opcodeDefs.bnz);
        opcode.validateOperand();

        const context: any = {
            branchTargets: {
                "a-label": 12,
            },
            stack: [
                makeBigInt(BigInt(0)),
            ],
        };
        opcode.validateContext(context);
        expect(opcode.execute(context)).toEqual(undefined);
    });
});