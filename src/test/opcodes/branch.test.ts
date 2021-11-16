import { opcodeDefs } from "../../lib/opcodes";
import { Branch } from "../../lib/opcodes/branch";

describe("branch opcode", () => {

    it("throws when branch target doesn't exist", () => {

        const token: any = {
            operands: [
                "a-label",
            ],
        };
        const opcode = new Branch(token, opcodeDefs.b)

        const context: any = {
            branchTargets: {
                // No branch target.
            },
        };
        opcode.validateOperand();
        expect(() => opcode.validateContext(context)).toThrow();
    });

    it ("can execute", () => {

        const token: any = {
            operands: [
                "a-label",
            ],
        };
        const opcode = new Branch(token, opcodeDefs.b);

        const context: any = {
            branchTargets: {
                "a-label": 32,
            },
        };
        opcode.validateOperand();
        expect(opcode.execute(context)).toEqual(32);
    });
});