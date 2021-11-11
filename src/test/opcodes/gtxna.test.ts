import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gtxna } from "../../lib/opcodes/gtxna";

describe("txna opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "0",
                "Field",
                "0",
            ],
        };
        const opcode = new Gtxna(token, opcodeDefs.gtxna);

        const context: any = {
            stack: [],
            txns: [
                {
                    Field: [
                        makeBigInt(BigInt(42))
                    ],
                },
            ],
        };
        opcode.validateOperand(); // Parses the operand.
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

    it("throws when when index is outside range of transactions", () => {

        const token: any = {
            operands: [
                "0",
                "xxx",
                "0",
            ],
        };
        const opcode = new Gtxna(token, opcodeDefs.gtxna);
        opcode.validateOperand();

        const context: any = {
            txns: [
                // No transactions.
            ],
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when field does not exist in specified transaction", () => {

        const token: any = {
            operands: [
                "0",
                "xxx",
                "0",
            ],
        };
        const opcode = new Gtxna(token, opcodeDefs.gtxna);
        opcode.validateOperand();

        const context: any = {
            txns: [
                {
                    // No fields.
                },
            ],
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when field is not an array", () => {

        const token: any = {
            operands: [
                "0",
                "Field",
                "0",
            ],
        };
        const opcode = new Gtxna(token, opcodeDefs.gtxna);
        opcode.validateOperand();

        const context: any = {
            txns: [
                {
                    Field: makeBigInt(BigInt(5)), // Not an array.
                },
            ],
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });

    it("throws when index is not in field array", () => {

        const token: any = {
            operands: [
                "0",
                "xxx",
                "0",
            ],
        };
        const opcode = new Gtxna(token, opcodeDefs.gtxna);
        opcode.validateOperand();

        const context: any = {
            txns: [
                {
                    Field: [
                        // No elements.
                    ], 
                },
            ],
        };
     
        expect(() => opcode.execute(context)).toThrow();
    });
        
});