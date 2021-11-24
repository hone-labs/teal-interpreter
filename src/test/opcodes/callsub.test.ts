import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Callsub } from "../../lib/opcodes/callsub";

describe("callsub opcode", () => {

    it("throws when branch target doesn't exist", () => {

        const token: any = {
            operands: [
                "a-label",
            ],
        };
        const opcode = new Callsub(token, opcodeDefs.b)

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
        const opcode = new Callsub(token, opcodeDefs.b);

        const context: any = {
            curInstructionIndex: 12,
            callstack: [],
            branchTargets: {
                "a-label": 32,
            },
        };
        opcode.validateOperand();
        expect(opcode.execute(context)).toEqual(32);
        expect(context.callstack.length).toEqual(1);
        expect(context.callstack[0]).toEqual(13);
    });
});
