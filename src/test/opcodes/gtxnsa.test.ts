import { makeBigInt } from "../../lib/context";
import { opcodeDefs } from "../../lib/opcodes";
import { Gtxnsa } from "../../lib/opcodes/gtxnsa";

describe("gtxnsa opcode", () => {

    it ("can execute", () => {

        const token: any = {
            operands: [
                "Something",
                "0",
            ],
        };
        const opcode = new Gtxnsa(token, opcodeDefs.gtxnsa);
        opcode.validateOperand();

        const context: any = {
            stack: [
                makeBigInt(BigInt(0))
            ],
            gtxn: [
                {
                    Something: [ makeBigInt(BigInt(42)) ],
                },
            ],
        };
        opcode.validateContext(context);
        opcode.execute(context);

        expect(context.stack.length).toEqual(1);
        expect(Number(context.stack[0]?.value)).toEqual(42);
    });

    // it("throws when when index is outside range of transactions", () => {

    //     const token: any = {
    //         operands: [
    //             "0",
    //             "xxx",
    //         ],
    //     };
    //     const opcode = new Gtxnsa(token, opcodeDefs.gtxnsa);
    //     opcode.validateOperand();

    //     const context: any = {
    //         gtxn: [
    //             // No transactions.
    //         ],
    //     };
     
    //     expect(() => opcode.execute(context)).toThrow();
    // });

    // it("throws when field does not exist in specified transaction", () => {

    //     const token: any = {
    //         operands: [
    //             "0",
    //             "xxx",
    //         ],
    //     };
    //     const opcode = new Gtxnsa(token, opcodeDefs.gtxnsa);
    //     opcode.validateOperand();

    //     const context: any = {
    //         gtxn: [
    //             {
    //                 // No fields.
    //             },
    //         ],
    //     };
     
    //     expect(() => opcode.execute(context)).toThrow();
    // });

});